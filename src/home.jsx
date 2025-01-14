import { useState, useEffect } from "react";
import Sr from "./search";
import Cnt from "./cn"; // Assurez-vous que ce fichier existe et est correctement nommé

const Home = () => {
    const [cat, setCat]= useState('')
    const [sear, setSear]= useState('')
    const [countries, setCountries] = useState(null);
    const [error, setError] = useState(null); // Initialiser la variable d'état 'error'

    useEffect(() => {
        fetch('http://localhost:5173/data/data.json')
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok ' + res.statusText);
                }
                return res.json().catch(err => {
                    throw new Error('Response is not JSON: ' + err.message);
                });
            })
            .then(data => {
                if (!data || !data.countries || !Array.isArray(data.countries)) {
                    throw new Error('Invalid data structure');
                }
                setCountries(data.countries);
            })
            
            .catch(error => {
                setError(error); // Mettre à jour la variable d'état 'error'
                console.error('There has been a problem with your fetch operation:', error);
            });
    }, []);

    return (
        <>
        {error && <div>Error: {error.message}</div>} {/* Afficher le message d'erreur si 'error' existe */}
        <Sr sear={sear} setSear={setSear} setCat={setCat}/>
        {countries && <Cnt countries={countries} sear = {sear} setSear={setSear} cat={cat}/>}
        </>
            
        
    );
}

export default Home;
