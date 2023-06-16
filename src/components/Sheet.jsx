import "../styles/sheet.css"

import { useEffect, useState } from "react";
import Embed from 'flat-embed';


export function Sheet(props) {
    const [embed, setEmbed] = useState(null);

    useEffect(() => {
        const container = document.getElementById('embed-container');
        const embed = new Embed(container, {
            score: '63c5d4aed4118d34674b1b42',
            embedParams: {
                appId: '63c5d787ddc7bc4767abc961',
                controlsPosition: 'top',
                mode: 'edit'
            }
        });
        setEmbed(embed);
    }, [])

    var download = () => {
        // Uncompressed MusicXML
        embed.getMusicXML({ compressed: true }).then(function (buffer) {
            // Create a Blob from a compressed MusicXML file (Uint8Array)
            var blobUrl = window.URL.createObjectURL(new Blob([buffer], {
                type: 'application/vnd.recordare.musicxml+xml'
            }));

            // Create a hidden link to download the blob
            var a = document.createElement('a');
            a.href = blobUrl;
            a.download = 'My Music Score.mxl';
            document.body.appendChild(a);
            a.style = 'display: none';
            a.click();
            a.remove();
        });
    }

    return (<div className="sheet">
        <div id="embed-container" className="embed-container"></div>
    </div>
    )
}