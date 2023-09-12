import React from 'react'
import './App.css'
import { Color, getSims } from './getSims';
import { SketchPicker } from 'react-color';

function App() {
  const [sims, setSims] = React.useState<Color[]>([]);
  const [color1, setColor1] = React.useState({
    r: 0,
    g: 0,
    b: 0
  });
  const [color2, setColor2] = React.useState({
    r: 0,
    g: 0,
    b: 0
  });

  const toHex = (arg: number) => {
    const conv = arg.toString(16);
    if (conv.length > 1) {
      return conv;
    } else {
      return '0' + conv;
    }
  }

  function getIt(): void {
    setSims(getSims(color1, color2));
  }

  return (
    <>
      <div
        style={{
          display: 'flex',
          gap: '20px',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <div>
          <section
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <p style={{ padding: '0', margin: '0', fontWeight: 'bolder', fontSize: '2rem' }}>COLOR 1</p>
            <div
              style={{
                minWidth: '3rem',
                minHeight: '3rem',
                width: '8rem',
                backgroundColor: `rgb(${color1.r}, ${color1.g}, ${color1.b})`
              }}
            >
              {`#${toHex(color1.r)}${toHex(color1.g)}${toHex(color1.b)}`}
            </div>
            <SketchPicker 
              color={color1}
              onChange={(color) => {
                setColor1(color.rgb)
              }}
            />
          </section>
          <section
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <p style={{ padding: '0', margin: '0', fontWeight: 'bolder', fontSize: '2rem' }}>COLOR 1</p>
            <div
              style={{
                minWidth: '3rem',
                minHeight: '3rem',
                width: '8rem',
                backgroundColor: `rgb(${color2.r}, ${color2.g}, ${color2.b})`
              }}
            >
              {`#${toHex(color2.r)}${toHex(color2.g)}${toHex(color2.b)}`}
            </div>
            <SketchPicker 
              color={color2}
              onChange={(color) => {
                setColor2(color.rgb)
              }}
            />
          </section>
          <button style={{ border: '1px black solid' }} onClick={getIt}><p>GET IT!</p></button>
        </div>
        <section
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            width: '8rem'
          }}
        >
          {sims?.map((color) => {
            const {r, g, b} = color
            return (
              <div
                key={`color-${r}${g}${b}`}
                style={{
                  minWidth: '3rem',
                  minHeight: '3rem',
                  width: 'auto',
                  backgroundColor: `rgb(${r}, ${g}, ${b})`
                }}><p>{`#${toHex(r)}${toHex(g)}${toHex(b)}`}</p></div>
            )
          })}
        </section>
      </div>
    </>
  )
}

export default App
