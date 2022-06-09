import {GOOGLE_MAP_API_KEY} from "./../env.json";
import axios from "axios";
import {Colors} from "../constants/Colors";

export function getMapPreview(lat,lng) {
    return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=16&size=400x200&maptype=roadmap&markers=color:blue%7Clabel:X%7C${lat},${lng}&key=${GOOGLE_MAP_API_KEY}`;
}