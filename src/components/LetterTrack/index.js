import React, { useEffect, useState } from 'react';

import './style.css';
import fence from '../../resources/images/fence.webp';
import shotSong from '../../resources/audio/Shot.mp3';
import winSong from '../../resources/audio/winSong1.mp3';
import failSong from '../../resources/audio/failSong1.mp3';
import backgroundTrack from '../../resources/audio/background.mp3';

import LetterPlate from '../LetterPlate';
import ScoreBoard from '../ScoreBoard';

const LetterTrack = () => {
    const letters = String.fromCharCode(...Array(91).keys()).slice(65)
    const [plate, setPlate] = useState({
        visible: false,
        explode: false
    });
    const [start, setStart] = useState(false);
    const [score, setScore] = useState(0);
    const [hits, setHits] = useState(0);
    const [velocity, setVelocity] = useState(1000);

    const getNewPlateData = () => {
        const letterIndex = Math.floor(Math.random() * 26);
        const variationIndex = Math.floor(Math.random() * 3);
        const variations = ['left', 'middle', 'right'];
        setPlate({
            letter: letters[letterIndex],
            variation: variations[variationIndex],
            visible: true,
            explode: false
        });
        handleVelocity();
    };

    const handleVelocity = () => {
        if (score < 1000) {
            setVelocity(1000);
            return;
        }
        if (score > 1000) {
            setVelocity(500);
            return;
        }
        if (score < 2000) {
            setVelocity(300);
            return;
        }
        if (score < 5000) {
            setVelocity(200);
            return;
        }
        if (score < 10000) {
            setVelocity(100);
            return;
        }
    }

    const handleStart = () => {
        if (start) {
            setPlate({ visible: false });
            setScore(0);
            setHits(0);
        }
        setStart(!start);
    }

    const shotSound = () => {
        const audio = new Audio(shotSong);
        audio.play();
    }

    const successSound = () => {
        const audio = new Audio(winSong);
        audio.play();
    }

    const failSound = () => {
        const audio = new Audio(failSong);
        audio.play();
    }

    const handleSuccessShot = () => {
        successSound();
        setPlate({
            visible: true,
            explode: true,
            variation: plate.variation
        });
        setScore(score + 100);
        setHits(hits + 1);
        setTimeout(getNewPlateData, velocity);
    };

    const getActualLetter = () => {
        return plate.letter;
    }

    const handleFailShot = () => {
        failSound();
        setHits(0);
    };

    const checkPressedLetter = (letter) => {
        shotSound();
        setTimeout(function () {
            if (letter === getActualLetter()) {
                handleSuccessShot();
                return;
            }
            handleFailShot();
        }, 150);

    }

    useEffect(() => {
        if (plate.visible === false && start) {
            getNewPlateData();
        }
        const init = () => {
            window.onkeypress = (e) => {
                checkPressedLetter(e.key.toUpperCase());
            }
        }
        init();
    }, [plate, getNewPlateData]);


    useEffect(() => {
        const audio = document.querySelector("#bg-audio");
        if (start) {
            audio.play();
        } else {
            audio.pause();
        }
    }, [start]);

    return (
        <div>
            <audio src={backgroundTrack} autoPlay={start} loop={true} id="bg-audio" />
            <div id="track">
                <LetterPlate letter={plate.letter} variation={plate.variation} visible={plate.visible} explode={plate.explode} />
                <img src={fence} alt="Cerca" />
                <ScoreBoard score={score} hits={hits} />
                <button type="button" onClick={handleStart}>{(!start) ? 'Começar o jogo' : 'Parar de jogar'}</button>
            </div>
        </div>
    );
}

export default LetterTrack;