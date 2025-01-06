import React, { useEffect } from "react";
import { useAnimations, useGLTF } from "@react-three/drei";
import { useRef } from "react";

import planeScene from '../assets/3D/plane.glb'


const Plane = ({isRotating, ...props}) => {
    const ref = useRef()
    const {scene, animations} = useGLTF(planeScene)
    const { actions } = useAnimations(animations, ref)

    useEffect(() => {
        if(isRotating) {
            actions['Take 001'].play()
        } else {
            actions['Take 001'].play()
        }
    }, [actions, isRotating])

    return (
       <mesh {...props} ref={ref} position={[0,0.513,-3]}>
            <primitive object={scene}/>
       </mesh>
    )
}

export default Plane