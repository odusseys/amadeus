import React from 'react';
import styled from 'styled-components';
import Vex from 'vexflow';

const SingleStave = ({ note }) => <div />;

class Stave extends React.Component {
  id = Math.random();
  componentDidMount = () => {
    const VF = Vex.Flow;
    var e = document.getElementById('stave-' + this.id);
    var renderer = new VF.Renderer(e, VF.Renderer.Backends.SVG);

    // Size our svg:
    renderer.resize(500, 500);

    // And get a drawing context:
    var context = renderer.getContext();
    // Create a stave at position 10, 40 of width 400 on the canvas.
    var stave = new VF.Stave(10, 40, 400);

    // Add a clef and time signature.
    let clef = stave.addClef('treble').addTimeSignature('4/4');
    console.warn(clef);
    // Connect it to the rendering context and draw!
    stave.setContext(context).draw();
  };
  render() {
    return <div id={'stave-' + this.id} />;
  }
}

export default Stave;
