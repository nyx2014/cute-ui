import React, {useEffect} from "react";
import { ReactComponent as Island } from './island.svg';
import './style.css';
import { gsap } from "gsap";
// @ts-ignore
import { MotionPathPlugin } from "gsap/MotionPathPlugin.js";

// gsap.registerPlugin(MotionPathPlugin);

export const Loading: React.FC = () => {
    useEffect(() => {
        // Whole Island
        gsap.to("#whole-island", {
            transformOrigin: "bottom center",
            y: -15,
            rotation: 1,
            duration: 1,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1 });

// Tree
        gsap.fromTo(
            "#tree",
            { transformOrigin: "bottom center", rotation: -6 },
            {
                transformOrigin: "bottom center",
                rotation: 5,
                duration: 2,
                ease: "sine.inOut",
                yoyo: true,
                repeat: -1 });

// Leaves

        gsap.to("#leaf1", {
            transformOrigin: "center right",
            y: -3,
            duration: 1,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1 });

        gsap.fromTo(
            "#leaf2",
            { transformOrigin: "bottom right", rotation: 3 },
            {
                transformOrigin: "bottom right",
                rotation: -4,
                x: -3,
                y: -3,
                duration: 1,
                ease: "sine.inOut",
                yoyo: true,
                repeat: -1 });

        gsap.to("#leaf3", {
            transformOrigin: "bottom center",
            rotation: -6,
            duration: 1,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1 });


        gsap.to("#leaf4", {
            transformOrigin: "bottom left",
            rotation: -6,
            y: -3,
            duration: 1,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1 });


        gsap.to("#leaf5", {
            transformOrigin: "top left",
            y: -3,
            duration: 1,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1 });


// Water Circles
        gsap.to("#water-circle1", {
            transformOrigin: "center center",
            scaleX: 1.2,
            duration: 1,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1 });


        gsap.to("#water-circle2", {
            transformOrigin: "center center",
            scaleX: 0.8,
            duration: 1,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: -0.5 });


// Triangle Waves
// Front Wave
        gsap.fromTo(
            "#tri-wave1",
            { x: -60 },
            { x: 20, duration: 6, repeat: -1, ease: "none" });

// Back Wave
        gsap.fromTo(
            "#tri-wave2",
            { x: -10 },
            { x: 50, duration: 6, repeat: -1, ease: "none" });

        gsap.fromTo(
            "#tri-wave1>path, #tri-wave2>path",
            { scaleY: 0 },
            {
                scaleY: 1,
                duration: 1,
                repeat: -1,
                yoyo: true,
                transformOrigin: "bottom center" });

//Sine Wa
        gsap.fromTo(
            "#sine-wave-group *",
            { x: 0 },
            { x: 75, repeat: -1, duration: 2, ease: "none" });

        gsap.fromTo(
            "#sine-wave-group *",
            { scaleY: 0.8, transformOrigin: "bottom center" },
            {
                scaleY: 1.2,
                transformOrigin: "bottom center",
                repeat: -1,
                duration: 1,
                yoyo: true,
                ease: "sine.inOut" });

// Fish
        gsap.registerPlugin(MotionPathPlugin);

        gsap.set("#fish-path", {
            scaleY: 1.3,
            scaleX: 1.3,
            transformOrigin: "bottom left" });

        gsap.to("#fish", {
            duration: 3,
            repeat: -1,
            repeatDelay: 4,
            ease: "slow(0.3, 0.7, false)",
            immediateRender: true,
            motionPath: {
                path: "#fish-path",
                align: "#fish-path",
                alignOrigin: [0.5, 0.5],
                autoRotate: true,
                start: 0,
                end: 1 } });
    }, []);

    return (
        <div className="container">
            <Island/>
        </div>
    );
}
