import React from 'react'
import './App.css'
import { Color, getSims } from './getSims';
import { SketchPicker } from 'react-color';
import { getContrastScore, luminance } from './getContrastScore';
import Tooltip from './Tooltip';

type Score = 'good' | 'well..' | 'bad' | 'unknown';

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
  const [luminanceAlert, setLuminanceAlert] = React.useState(false);
  const [score, setScore] = React.useState<Score>('unknown');
  const [fontColor, setFontColor] = React.useState('black');
  // variation 개수
  const [seperates, setSeperates] = React.useState(1);
  const [xpos, setXpos] = React.useState(0);
  const [ypos, setYpos] = React.useState(0);
  const [show, setShow] = React.useState<boolean>(false);

  const toHex = (arg: number) => {
    const conv = arg.toString(16);
    if (conv.length > 1) {
      return conv;
    } else {
      return '0' + conv;
    }
  }


  React.useEffect(() => {
    const colors = getSims(color1, color2, seperates + 1);
    setSims(colors);
  }, [seperates, color1, color2])

  React.useEffect(() => {
    const lum1 = luminance(color1);
    const lum2 = luminance(color2);
    if (lum1 <= lum2) {
      setLuminanceAlert(true);
    } else {
      setLuminanceAlert(false);
    }
    const _score = getContrastScore(color1, color2);
    if (_score > 1 && _score < 4.5) {
      setScore('bad');
      setFontColor('red');
    } else if (_score < 6) {
      setScore('well..');
      setFontColor('#d2c332');
    } else if (_score <= 21) {
      setScore('good');
      setFontColor('#7ed321');
    } else {
      setScore('unknown');
    }
  }, [color1, color2])

  const copyHex = (e: React.MouseEvent<HTMLDivElement>) => {
    window.navigator.clipboard.writeText(e.currentTarget.innerText).then(() => {
      alert("Copied completely!");
    });
  }

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
      }}
      onClick={(e) => {
        if ((e.target as Element).id !== 'separateTitle') { setShow(false); }
      }}
    >
      <Tooltip {...{ xpos, ypos, payload: 'Number of divisions between two colors', show }} />
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '5rem',
      }}>
        <section className="title">
          {luminanceAlert
            &&
            <p
              style={{
                position: 'absolute',
                left: '50%',
                top: '-10%',
                margin: 0,
                padding: 0,
                color: 'red',
                fontWeight: 'bolder',
                fontSize: '1.5rem',
                transform: 'translate(-50%, 0)'
              }}
            >Light Theme Color should be lighter than Dark Theme Color</p>}
          <p
            style={{
              margin: 0,
              padding: 0,
              color: fontColor,
              fontWeight: 'bolder',
              fontSize: '2.5rem'
            }}
          ><span style={{
            color: 'black',
          }}>Contrast Guidance: </span>{score.toUpperCase()}</p>
        </section>
        <div
          style={{
            height: '621px',
            display: 'flex',
            gap: '20px',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
          }}>
            <div>
              <p
                id='separateTitle'
                onClick={(e) => {
                  setXpos(e.clientX);
                  setYpos(e.clientY);
                  setShow(true);
                }}
              >Seperates<span> : {seperates}</span></p>
              <input
                id='seperates'
                type='range'
                min='1'
                max='100'
                value={seperates}
                style={{
                  width: '100%',
                }}
                onChange={(e) => {
                  setSeperates(parseInt(e.target.value));
                }}
              />
            </div>
            <div className="colorPickers">
              <section
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '1rem',
                }}
              >
                <p style={{ padding: '0', margin: '0', fontWeight: 'bolder', fontSize: '2rem' }}>Light</p>
                <div
                  className="colorBox"
                  style={{
                    backgroundColor: `rgb(${color1.r}, ${color1.g}, ${color1.b})`,
                    // color: `rgb(${255 - color1.r}, ${255 - color1.g}, ${255 - color1.b})`
                  }}
                  onClick={copyHex}
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
                <p style={{ padding: '0', margin: '0', fontWeight: 'bolder', fontSize: '2rem' }}>Dark</p>
                <div
                  className="colorBox"
                  style={{
                    backgroundColor: `rgb(${color2.r}, ${color2.g}, ${color2.b})`,
                    // color: `rgb(${255 - color2.r}, ${255 - color2.g}, ${255 - color2.b})`
                  }}
                  onClick={copyHex}
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
            </div>
            {/* <button style={{ border: '1px black solid' }} onClick={getIt}><p>GET IT!</p></button> */}
          </div>
          <section
            className='colorsSection'
          >
            {sims?.map((color, i) => {
              const { r, g, b } = color
              return (
                <div
                  key={`color-${r}${g}${b}-${i}`}
                  className="colorBox"
                  style={{
                    backgroundColor: `rgb(${r}, ${g}, ${b})`,
                    // color: `rgb(${255 - r}, ${255 - g}, ${255 - b})`
                  }}
                  onClick={copyHex}
                >
                  {`#${toHex(r)}${toHex(g)}${toHex(b)}`}
                </div>
              )
            })}
          </section>
        </div >
      </div >
    </div>
  )
}

export default App
