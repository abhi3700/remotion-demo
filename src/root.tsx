import React from 'react';
import {Composition, Folder} from 'remotion';
import {CircuitScene} from './scenes/circuit';
import {ExchangeScene} from './scenes/exchange';
import {IngredientsScene} from './scenes/ingredients';
import {IntroScene} from './scenes/intro';
import {OutroScene} from './scenes/outro';
import {UsesScene} from './scenes/uses';
import {ZKPExplainer} from './video';

export const Root: React.FC = () => (
  <>
    <Folder name="Scenes">
      <Composition
        component={IntroScene}
        durationInFrames={288}
        fps={30}
        height={1080}
        id="SceneIntro"
        width={1920}
      />
      <Composition
        component={ExchangeScene}
        durationInFrames={378}
        fps={30}
        height={1080}
        id="SceneExchange"
        width={1920}
      />
      <Composition
        component={IngredientsScene}
        durationInFrames={348}
        fps={30}
        height={1080}
        id="SceneIngredients"
        width={1920}
      />
      <Composition
        component={CircuitScene}
        durationInFrames={378}
        fps={30}
        height={1080}
        id="SceneCircuit"
        width={1920}
      />
      <Composition
        component={UsesScene}
        durationInFrames={438}
        fps={30}
        height={1080}
        id="SceneUses"
        width={1920}
      />
      <Composition
        component={OutroScene}
        durationInFrames={240}
        fps={30}
        height={1080}
        id="SceneOutro"
        width={1920}
      />
    </Folder>
    <Composition
      component={ZKPExplainer}
      durationInFrames={1980}
      fps={30}
      height={1080}
      id="ZKPExplainer"
      width={1920}
    />
  </>
);
