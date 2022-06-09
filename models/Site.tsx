class Site {
    id
    title
    imageUri
    address
    location
    constructor(title, imageUri, location) {
        this.title = title;
        this.imageUri = imageUri;
        this.address = location.address;
        this.location = {
            lat: location.lat,
            lng: location.lng
        };
        this.id = new Date().toISOString().slice(0,10) + Math.random().toString();
    }
}

export default Site;