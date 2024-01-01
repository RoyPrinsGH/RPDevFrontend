import React, { useEffect, useRef } from "react";
import AssetManager from "../logic/AssetManager";

interface BackgroundAudioPlayerProps {
    audioName: string;
    playing: boolean;
}

const BackgroundAudioPlayer: React.FC<BackgroundAudioPlayerProps> = (props) => {

    const audio = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        console.log("BackgroundAudioPlayer (re-)rendering...");

        if (audio.current === null) {
            return;
        }

        if (props.playing) {
            audio.current!.play();
        }
        else {
            audio.current!.pause();
        }

        return () => {
            audio.current?.pause();
        }
    })

    return (
        <audio ref={audio} src={AssetManager.getMp3(props.audioName)}>
            <p>If you are reading this, it is because your browser does not support the audio element.</p>
        </audio>
    );

}

export default BackgroundAudioPlayer;
