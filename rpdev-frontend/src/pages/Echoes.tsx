import React, { useState} from "react";
import CustomCursor from "../components/CustomCursor";
import BackgroundAudioPlayer from "../components/BackgroundAudioPlayer";

const Echoes: React.FC = () => {

    const [isPlayingAudio, setIsPlayingAudio] = useState(false);

    const toggleAudio = () => {
        setIsPlayingAudio(!isPlayingAudio);
    }

    return (
        <div className='page p-4 bg-blue-950 h-full w-full'>

            <CustomCursor moveDuration={0.2} shrinkDuration={0.1} />
            <BackgroundAudioPlayer audioName="echoes" playing={isPlayingAudio} />

            <div className="content text-center">
                <div className="flex flex-col" style={{"gap" : isPlayingAudio ? "2rem" : "6rem", "transition": "gap 2s ease"}}>
                    <div className="padding" style={{"paddingBottom": isPlayingAudio ? "initial" : "8rem", "transition": "padding-bottom 2s ease"}}/>
                    <div>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={toggleAudio}>
                            {isPlayingAudio ? "Pause" : "Play"} Echoes
                        </button>
                    </div>
                    <div className="belowbutton h-44">
                        <div className="lyrics text-white font-thin absolute left-0 right-0" style={{"transition": "opacity 2s linear", "opacity": isPlayingAudio ? 1 : 0}}>
                            <p>Overhead the albatross hangs motionless upon the air</p>
                            <p>And deep beneath the rolling waves in labyrinths of coral caves</p>
                            <p>The echo of a distant time comes willowing across the sand</p>
                            <p>And everything is green and submarine</p>
                            <br />
                            <p>And no one showed us to the land</p>
                            <p>And no one knows the wheres or whys</p>
                            <p>But something stirs and something tries</p>
                            <p>And starts to climb towards the light</p>
                            <br />
                            <p>Strangers passing in the street</p>
                            <p>By chance two separate glances meet</p>
                            <p>And I am you and what I see is me</p>
                            <p>And do I take you by the hand?</p>
                            <p>And lead you through the land?</p>
                            <p>And help me understand the best I can?</p>
                            <br />
                            <p>And no one calls us to move on</p>
                            <p>And no one forces down our eyes</p>
                            <p>No one speaks and no one tries</p>
                            <p>No one flies around the sun</p>
                            <br />
                            <p>Cloudless every day you fall</p>
                            <p>Upon my waking eyes</p>
                            <p>Inviting and inciting me to rise</p>
                            <br />
                            <p>And through the window in the wall</p>
                            <p>Come streaming in on sunlight wings</p>
                            <p>A million bright ambassadors of morning</p>
                            <br />
                            <p>And no one sings me lullabies</p>
                            <p>And no one makes me close my eyes</p>
                            <p>So I throw the windows wide</p>
                            <p>And call to you across the sky</p>
                        </div>
                        <div className="credits text-white font-thin absolute left-0 right-0" style={{"transition": "opacity 2s linear", "opacity": isPlayingAudio ? 0 : 1}}>
                            <p>Echoes by Pink Floyd</p>
                            <p>From the album Meddle (1971)</p>
                            <p>Written by Roger Waters, David Gilmour, Richard Wright, and Nick Mason</p>
                            <p>Produced by Pink Floyd</p>
                            <p>Engineered by Peter Bown</p>
                            <p>Recorded at AIR Studios, London, England</p>
                            <p>Released by Harvest Records</p>
                            <p>All rights reserved by Pink Floyd Music Ltd.</p>
                            <p>Audio file obtained from <a href="https://www.youtube.com/watch?v=53N99Nim6WE">YouTube</a></p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );

};

export default Echoes;
