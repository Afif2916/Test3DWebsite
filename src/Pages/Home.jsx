import React, { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import Island from "../Models/Island"
import Loader from "../Components/Loader"
import Sky from "../Models/Sky"
import Plane from "../Models/Plane"
import Bird from "../Models/Bird"
import { useState } from "react"
import HomeInfo from "../Components/HomeInfo"

const Home = () => {

    
    const adjustIslandForScreenSize = () => {
        let screenScale, screenPosition;
    
        if (window.innerWidth < 768) {
          screenScale = [0.9, 0.9, 0.9];
          screenPosition = [0, -10.5, -43.4];
        } else {
          screenScale = [1, 1, 1];
          screenPosition = [0, -9.5, -43.4];
        }
    
        return [screenScale, screenPosition];
      };

    const adjustPlaneForScreenSize = () => {
        let screenScale, screenPosition;

        if(window.innerWidth < 768 ) {
            screenScale = [1.5,1.5,1.5]
            screenPosition = [0, -1.5, 0]
        } else {
            screenScale = [2,2,2]
            screenPosition = [0,-4,-4]
        }

        return [screenScale, screenPosition]
    }

    const [islandScale, islandPosition, islandRotation] = adjustIslandForScreenSize()
    const [planeScale, planePosition] = adjustPlaneForScreenSize()
    const [isRotating, setIsRotating] = useState(false)
    const [current, setCurrentStage] = useState(1)

    return(
        <section className="w-full h-screen relative">
            <div className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center">
                {current ? <HomeInfo current={current} /> : null}
            </div>
            <Canvas className={`w-full h-screen bg-transparent ${isRotating ? 'cursor-grabbing' : 'cursor-grab'}`}
                    camera={{near: 0.1, far: 1000}}
            >
                <Suspense fallback={<Loader />}>
                    <directionalLight position={[1,1,1]} intensity={1}/>
                    <ambientLight intensity={0.5}/>
                    <hemisphereLight skyColor="#b1e1ff" groundColor="#000000" intensity={1}/>

                    <Sky isRotating={isRotating}/>
                    <Bird isRotating={isRotating}/>
                    <Island
                        position={islandPosition}
                        scale={islandScale}
                        rotation={islandRotation}
                        isRotating={isRotating}
                        setIsRotating={setIsRotating}
                        setCurrentStage={setCurrentStage}
                    />
                    <Plane 
                     isRotating = {isRotating}
                     position = {planePosition}
                     scale={planeScale}
                     rotation={[0,14,0]}
                    />
                </Suspense>

            </Canvas>
        </section>
    )
}

export default Home