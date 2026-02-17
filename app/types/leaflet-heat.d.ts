export { }; // Ensure it's a module
declare global {
    namespace L {
        function heatLayer(latlngs: Array<[number, number, number]>, options?: any): any;
    }
}
