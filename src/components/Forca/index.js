import React from 'react';
import './index.scss'
import { useSelector } from 'react-redux';

const Forca = ({errors}) => {
    const forca = useSelector(state => state.tiedMan); // Recebe as URLs referentes as imagens da forca

    return (
        <div className="container-forca">
            <img className="forca" src={forca[errors]}/> {/* Usa as props "errors" como o index dos array com as imagens da forca*/}            
        </div>
    )
}

export default Forca;