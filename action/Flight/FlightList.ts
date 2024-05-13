'use server'
import axios from 'axios'

export default async function GetFlightList() {

    try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASEURL}flight/airport-list`,);
        return response.data;
    } catch (error) {
        return {
            error: "Failed to retrieve user data. Please check your credentials."
        };
    }
}
