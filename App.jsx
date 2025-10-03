import React, { useState, useEffect, useCallback } from 'react';
import useExternalScript from './hooks/useExternalScript';
import MetricsDisplay from './components/MetricsDisplay';
import ChangeDetectionDisplay from './components/ChangeDetectionDisplay';

// Leaflet & Lucide URLs
const leafletCssUrl = "https://unpkg.com/leaflet@1.7.1/dist/leaflet.css";
const leafletJsUrl = "https://unpkg.com/leaflet@1.7.1/dist/leaflet.js";
const lucideUrl = "https://unpkg.com/lucide@latest";

const App = () => {
    const [isLeafletLoaded, setIsLeafletLoaded] = useState(false);
    const [map, setMap] = useState(null);

    // Load external scripts
    useExternalScript(leafletCssUrl, 'style');
    useExternalScript(leafletJsUrl, 'script', () => {
        if (window.L) setIsLeafletLoaded(true);
    });
    useExternalScript(lucideUrl, 'script');

    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState(null);
    const [error, setError] = useState(null);

    // Map initialization
    useEffect(() => {
        if (isLeafletLoaded && window.L && !map) {
            const mapEl = document.getElementById('map-container');
            if (!mapEl) return;

            const initialMap = window.L.map('map-container', { center: [40.73, -73.93], zoom: 12 });
            window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18 }).addTo(initialMap);
            setMap(initialMap);
        }
    }, [isLeafletLoaded, map]);

    useEffect(() => () => { if (map) map.remove(); }, [map]);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setFileName(selectedFile.name);
            setResults(null);
            setError(null);
        }
    };

    const clearMapLayers = useCallback(() => {
        if (!map) return;
        map.eachLayer(layer => layer.options?.isGeoSenseLayer && map.removeLayer(layer));
    }, [map]);

    // Dummy inference simulation
    const runInferenceSimulation = useCallback(async (fileData) => {
        setIsLoading(true);
        setError(null);
        setResults(null);
        clearMapLayers();

        try {
            // Simulated results
            const simulatedResult = {
                summary: "Simulated land-use summary for GeoSenseAI.",
                metrics: { urban_percent: 25, water_percent: 15, vegetation_percent: 45, barren_land_percent: 15 },
                change_detection: { vegetation_loss_percent: 3.2, urban_growth_rate: 1.1, risk_areas_note: "Urban expansion in northern region." },
                geojson_overlay: { type: "FeatureCollection", features: [] } 
            };
            setResults(simulatedResult);
        } catch (e) { setError("Simulation failed."); }
        finally { setIsLoading(false); }
    }, [clearMapLayers]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (file) runInferenceSimulation(file);
        else setError("Please upload a satellite image first.");
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans p-4 sm:p-8">
            <div className="max-w-7xl mx-auto">
                <header className="text-center mb-10">
                    <h1 className="text-4xl font-extrabold text-indigo-700 flex items-center justify-center">
                        <i className="lucide lucide-satellite-dish w-8 h-8 mr-3"></i>
                        GeoSenseAI Dashboard
                    </h1>
                    <p className="mt-2 text-xl text-gray-500">Geospatial Analysis and Environmental Monitoring Platform</p>
                </header>

                <div className="grid lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-8 order-2 lg:order-1">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center">
                            <i className="lucide lucide-map w-6 h-6 mr-2 text-indigo-500"></i>
                            Map Visualization
                        </h2>
                        <div id="map-container" className="shadow-2xl" style={{ height: '60vh', minHeight: '400px', borderRadius: '0.75rem' }}></div>
                    </div>

                    <div className="lg:col-span-4 space-y-6 order-1 lg:order-2">
                        <form onSubmit={handleSubmit} className="p-6 bg-white rounded-xl shadow-lg border border-indigo-100">
                            <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center">
                                <i className="lucide lucide-upload-cloud w-6 h-6 mr-2 text-indigo-500"></i>
                                Upload Image
                            </h2>
                            <input type="file" accept="image/*,.tiff,.tif" onChange={handleFileChange} className="block w-full text-sm text-gray-500 file:rounded-full file:bg-indigo-50 file:text-indigo-700" />
                            {fileName && <p className="mt-3 text-xs text-gray-600 truncate">File: <span className="font-medium">{fileName}</span></p>}
                            {error && <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">{error}</div>}
                            <button type="submit" disabled={!file || isLoading || !isLeafletLoaded} className="w-full mt-6 py-3 bg-indigo-600 text-white rounded-xl font-bold">
                                {isLoading ? "Running AI Inference..." : "Run Classification & Change Detection"}
                            </button>
                        </form>

                        {results && (
                            <div className="p-6 bg-indigo-50 rounded-xl shadow-xl border border-indigo-200 space-y-6">
                                <blockquote className="p-3 bg-white rounded-lg border-l-4 border-indigo-400 italic text-gray-700 shadow-sm text-sm">{results.summary}</blockquote>
                                <MetricsDisplay metrics={results.metrics} />
                                <ChangeDetectionDisplay change_detection={results.change_detection} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
