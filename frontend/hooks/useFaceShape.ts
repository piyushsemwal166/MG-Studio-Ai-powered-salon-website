import { useState } from "react";

export function useFaceShape() {
  const [faceShape, setFaceShape] = useState<string>("");

  const detectFaceShape = async (image: HTMLImageElement) => {
    const mp = (window as any).FaceMesh;

    const faceMesh = new mp({
      locateFile: (file: string) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
    });

    faceMesh.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
    });

    return new Promise<any>((resolve) => {
      faceMesh.onResults((results: any) => {
        if (!results.multiFaceLandmarks?.length) return;

        const landmarks = results.multiFaceLandmarks[0];

        const left = landmarks[234];
        const right = landmarks[454];
        const top = landmarks[10];
        const bottom = landmarks[152];

        const width = Math.abs(left.x - right.x);
        const height = Math.abs(top.y - bottom.y);

        let shape = "Oval";
        if (width > height * 0.95) shape = "Round";
        else if (height > width * 1.2) shape = "Oval";
        else shape = "Square";

        setFaceShape(shape);

        resolve({
          shape,
          landmarks,
          box: { left, right, top, bottom, width, height },
        });
      });

      faceMesh.send({ image });
    });
  };

  return { faceShape, detectFaceShape };
}