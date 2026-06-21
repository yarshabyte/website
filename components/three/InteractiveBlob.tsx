"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import {
  ClampToEdgeWrapping,
  Color,
  LinearFilter,
  SRGBColorSpace,
  TextureLoader,
  Vector2,
  type Group,
  type ShaderMaterial,
} from "three";

import {
  blobFragmentShader,
  blobVertexShader,
} from "@/components/three/blob-shaders";
import { usePagePointer } from "@/hooks/usePagePointer";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { damp } from "@/lib/three-utils";

export interface InteractiveBlobProps {
  textureUrl?: string;
  reflectionColor?: string;
  targetXMobile?: number;
  targetXDesktop?: number;
  targetYMobile?: number;
  targetYDesktop?: number;
  startVisible?: boolean;
}

export function InteractiveBlob({
  textureUrl = "/logo-ico.webp",
  reflectionColor = "#edece2",
  targetXMobile = 0.02,
  targetXDesktop = -0.255,
  targetYMobile = 0.18,
  targetYDesktop = -0.11,
  startVisible = false,
}: InteractiveBlobProps) {
  const groupRef = useRef<Group>(null);
  const materialRef = useRef<ShaderMaterial>(null);
  const hasEnteredRef = useRef(startVisible);
  const pointer = usePagePointer();
  const reduceMotion = useReducedMotion();
  const { viewport, size } = useThree();
  const mobile = size.width < 768;
  const restingScale = mobile ? 0.5 : 0.72;

  const [texture, setTexture] = useState(() => {
    const configuredTexture = new TextureLoader().load(textureUrl);
    configuredTexture.colorSpace = SRGBColorSpace;
    configuredTexture.wrapS = ClampToEdgeWrapping;
    configuredTexture.wrapT = ClampToEdgeWrapping;
    configuredTexture.minFilter = LinearFilter;
    configuredTexture.magFilter = LinearFilter;
    return configuredTexture;
  });

  const currentTextureRef = useRef(texture);

  useEffect(() => {
    new TextureLoader().load(textureUrl, (loadedTexture) => {
      loadedTexture.colorSpace = SRGBColorSpace;
      loadedTexture.wrapS = ClampToEdgeWrapping;
      loadedTexture.wrapT = ClampToEdgeWrapping;
      loadedTexture.minFilter = LinearFilter;
      loadedTexture.magFilter = LinearFilter;
      
      const material = materialRef.current;
      if (material) {
        material.uniforms.uTexture.value = currentTextureRef.current;
        material.uniforms.uNextTexture.value = loadedTexture;
        material.uniforms.uMixTexture.value = 0;

        gsap.killTweensOf(material.uniforms.uMixTexture);
        gsap.to(material.uniforms.uMixTexture, {
          value: 1,
          duration: 0.7,
          ease: "power2.inOut",
          onComplete: () => {
            currentTextureRef.current = loadedTexture;
            setTexture(loadedTexture);
            material.uniforms.uTexture.value = loadedTexture;
            material.uniforms.uMixTexture.value = 0;
          }
        });

        // Visually pulse and squish the blob during the texture swap
        if (!reduceMotion) {
          const { uAmplitude, uFrequency, uLightFactor } = material.uniforms;
          gsap.killTweensOf([uAmplitude, uFrequency, uLightFactor]);
          gsap.timeline()
            .to(uAmplitude, { value: 7.2, duration: 0.35, ease: "power4.inOut" }, 0)
            .to(uAmplitude, { value: 2.4, duration: 0.35, ease: "power4.inOut" }, 0.35)
            .to(uFrequency, { value: 0.56, duration: 0.35, ease: "power4.inOut" }, 0)
            .to(uFrequency, { value: 0.55, duration: 0.35, ease: "power4.inOut" }, 0.35)
            .to(uLightFactor, { value: 1.8, duration: 0.35, ease: "power4.inOut" }, 0)
            .to(uLightFactor, { value: 1.0, duration: 0.35, ease: "power4.inOut" }, 0.35);
        }
      } else {
        currentTextureRef.current = loadedTexture;
        setTexture(loadedTexture);
      }
    });
  }, [textureUrl]);

  useEffect(() => {
    if (materialRef.current) {
      const targetColor = new Color(reflectionColor);
      gsap.to(materialRef.current.uniforms.uReflectionColor.value, {
        r: targetColor.r,
        g: targetColor.g,
        b: targetColor.b,
        duration: 0.8,
        ease: "power2.out"
      });
    }
  }, [reflectionColor]);

  const textureImage = texture.image as HTMLImageElement | undefined;
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSpeed: { value: 9.18 },
      uFrequency: { value: 0.55 },
      uAmplitude: { value: 2.4 },
      uTexture: { value: texture },
      uNextTexture: { value: texture },
      uMixTexture: { value: 0 },
      uResolution: { value: new Vector2(size.width, size.height) },
      uTextureSize: {
        value: new Vector2(
          textureImage?.naturalWidth || textureImage?.width || 1,
          textureImage?.naturalHeight || textureImage?.height || 1,
        ),
      },
      uReflectionColor: { value: new Color(reflectionColor) },
      uIor: { value: 1.03 },
      uLightFactor: { value: 1 },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [size.height, size.width]
  );

  useEffect(() => {
    uniforms.uResolution.value.set(size.width, size.height);
  }, [size.height, size.width, uniforms]);

  useEffect(() => {
    const group = groupRef.current;

    if (!group || startVisible) {
      return;
    }

    const enter = () => {
      if (hasEnteredRef.current) {
        return;
      }

      hasEnteredRef.current = true;
      const material = materialRef.current;

      gsap.to(group.scale, {
        x: restingScale,
        y: restingScale,
        z: restingScale,
        duration: 0.75,
        ease: "power4.inOut",
      });
      gsap.fromTo(
        group.rotation,
        { y: group.rotation.y - 0.8 },
        { y: group.rotation.y, duration: 1.1, ease: "power4.out" },
      );

      if (material && !reduceMotion) {
        const { uAmplitude, uFrequency, uLightFactor } = material.uniforms;
        gsap.killTweensOf([uAmplitude, uFrequency, uLightFactor]);
        gsap
          .timeline()
          .to(uAmplitude, { value: 8.4, duration: 0.35, ease: "power4.inOut" }, 0)
          .to(uAmplitude, { value: 2.4, duration: 0.35, ease: "power4.inOut" }, 0.35)
          .to(uFrequency, { value: 0.56, duration: 0.35, ease: "power4.inOut" }, 0)
          .to(uFrequency, { value: 0.55, duration: 0.35, ease: "power4.inOut" }, 0.35)
          .to(uLightFactor, { value: 2.35, duration: 0.35, ease: "power4.inOut" }, 0)
          .to(uLightFactor, { value: 1.0, duration: 0.35, ease: "power4.inOut" }, 0.35);
      }
    };

    const reset = () => {
      hasEnteredRef.current = false;
      gsap.killTweensOf(group.scale);
      gsap.killTweensOf(group.rotation);
      const material = materialRef.current;
      if (material) {
        gsap.killTweensOf([
          material.uniforms.uAmplitude,
          material.uniforms.uFrequency,
          material.uniforms.uLightFactor
        ]);
        material.uniforms.uAmplitude.value = 2.4;
        material.uniforms.uFrequency.value = 0.55;
        material.uniforms.uLightFactor.value = 1;
      }
      group.scale.set(0.001, 0.001, 0.001);
    };

    const fallback = window.setTimeout(enter, 1500);
    window.addEventListener("yarsha:blob-enter", enter);
    window.addEventListener("yarsha:blob-reset", reset);

    return () => {
      window.clearTimeout(fallback);
      window.removeEventListener("yarsha:blob-enter", enter);
      window.removeEventListener("yarsha:blob-reset", reset);
      gsap.killTweensOf(group.scale);
      gsap.killTweensOf(group.rotation);
      if (materialRef.current) {
         gsap.killTweensOf([
           materialRef.current.uniforms.uAmplitude,
           materialRef.current.uniforms.uFrequency,
           materialRef.current.uniforms.uLightFactor
         ]);
      }
    };
  }, [restingScale, reduceMotion]);

  useEffect(() => {
    const handlePulse = (event: Event) => {
      const group = groupRef.current;
      const material = materialRef.current;

      if (!group || !material || reduceMotion) {
        return;
      }

      
      const clockwise =
        (event as CustomEvent<{ clockwise?: boolean }>).detail?.clockwise ??
        false;
      const { uAmplitude, uFrequency, uLightFactor } = material.uniforms;

      gsap.killTweensOf([uAmplitude, uFrequency, uLightFactor, group.rotation]);
      gsap
        .timeline()
        .to(uAmplitude, { value: 8.4, duration: 0.35, ease: "power4.inOut" }, 0)
        .to(uAmplitude, { value: 2.4, duration: 0.35, ease: "power4.inOut" }, 0.35)
        .to(uFrequency, { value: 0.56, duration: 0.35, ease: "power4.inOut" }, 0)
        .to(uFrequency, { value: 0.55, duration: 0.35, ease: "power4.inOut" }, 0.35)
        .to(uLightFactor, { value: 2.35, duration: 0.35, ease: "power4.inOut" }, 0)
        .to(uLightFactor, { value: 1.0, duration: 0.35, ease: "power4.inOut" }, 0.35);
      gsap.to(group.rotation, {
        y: group.rotation.y + (clockwise ? -1.5 : 1.5),
        duration: 0.6,
        ease: "power4.out",
      });
    };

    window.addEventListener("yarsha:blob-pulse", handlePulse);
    return () => window.removeEventListener("yarsha:blob-pulse", handlePulse);
  }, [reduceMotion]);

  useFrame(({ camera }, delta) => {
    const group = groupRef.current;
    const material = materialRef.current;

    if (!group || !material) {
      return;
    }

    material.uniforms.uTime.value += delta;

    const targetX = mobile ? viewport.width * targetXMobile : viewport.width * targetXDesktop;
    const targetY = mobile ? viewport.height * targetYMobile : viewport.height * targetYDesktop;
    group.position.x = damp(group.position.x, targetX, 4, delta);
    group.position.y = damp(group.position.y, targetY, 7, delta);
    group.rotation.z = damp(group.rotation.z, -0.08, 4, delta);
    const pointerTiltX = reduceMotion ? 0 : -pointer.current.y * (mobile ? 0.35 : 0.08);
    const pointerTiltY = reduceMotion ? 0 : pointer.current.x * (mobile ? 0.45 : 0.10);
    const rotDamping = mobile ? 8 : 4;
    group.rotation.x = damp(group.rotation.x, 0.12 + pointerTiltX, rotDamping, delta);
    group.rotation.y = damp(group.rotation.y, (mobile ? 0 : 0.1) + pointerTiltY, rotDamping, delta);

    if (!reduceMotion) {
      camera.position.x = damp(camera.position.x, pointer.current.x * 0.62, 4, delta);
      camera.position.y = damp(camera.position.y, pointer.current.y * 0.42, 4, delta);
      camera.position.z = damp(camera.position.z, 15, 4, delta);
      camera.lookAt(0, 0, 0);
    }
  });

  return (
    <group
      ref={groupRef}
      scale={startVisible || reduceMotion ? restingScale : 0.001}
      rotation={[0.12, mobile ? -0.12 : -0.34, -0.08]}
    >
      <mesh>
        <icosahedronGeometry args={[2.5, 15]} />
        <shaderMaterial
          ref={materialRef}
          vertexShader={blobVertexShader}
          fragmentShader={blobFragmentShader}
          uniforms={uniforms}
          transparent
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
