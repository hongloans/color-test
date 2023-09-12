import React from 'react'
import './App.css'
import { Color, getSims } from './getSims';

function App() {
  const [r1, setR1] = React.useState(0);
  const [g1, setG1] = React.useState(0);
  const [b1, setB1] = React.useState(0);
  const [r2, setR2] = React.useState(0);
  const [g2, setG2] = React.useState(0);
  const [b2, setB2] = React.useState(0);
  const [sims, setSims] = React.useState<Color[]>([]);

  const toHex = (arg: number) => {
    const conv = arg.toString(16);
    if (conv.length > 1) {
      return conv;
    } else {
      return '0' + conv;
    }
  }

  React.useEffect(() => {
    setSims(getSims([r1, g1, b1], [r2, g2, b2]));
  }, [b1, b2, g1, g2, r1, r2])

  return (
    <>
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
        <div style={{
          minWidth: '3rem',
          minHeight: '3rem',
          width: 'auto',
          backgroundColor: `rgb(${r1}, ${g1}, ${b1})`
        }}>{`#${toHex(r1)}${toHex(g1)}${toHex(b1)}`}</div>
        <label htmlFor="r1">
          {r1}
          <input id="r1" type='range' max={255} min={0} value={r1} onChange={(e) => {
            setR1(parseInt(e.target.value));
          }} />
        </label>
        <label htmlFor="g1">
          {g1}
          <input id="g1" type='range' max={255} min={0} value={g1} onChange={(e) => {
            setG1(parseInt(e.target.value));
          }} />
        </label>
        <label htmlFor="b1">
          {b1}
          <input id="b1" type='range' max={255} min={0} value={b1} onChange={(e) => {
            setB1(parseInt(e.target.value));
          }} />
        </label>
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
        <p style={{ padding: '0', margin: '0', fontWeight: 'bolder', fontSize: '2rem' }}>COLOR 2</p>
        <div style={{
          minWidth: '3rem',
          minHeight: '3rem',
          width: 'auto',
          backgroundColor: `rgb(${r2}, ${g2}, ${b2})`
        }}>{`#${toHex(r2)}${toHex(g2)}${toHex(b2)}`}</div>
        <label htmlFor="r2">
          {r2}
          <input id="r2" type='range' max={255} min={0} value={r2} onChange={(e) => {
            setR2(parseInt(e.target.value));
          }} />
        </label>
        <label htmlFor="g2">
          {g2}
          <input id="g2" type='range' max={255} min={0} value={g2} onChange={(e) => {
            setG2(parseInt(e.target.value));
          }} />
        </label>
        <label htmlFor="b2">
          {b2}
          <input id="b2" type='range' max={255} min={0} value={b2} onChange={(e) => {
            setB2(parseInt(e.target.value));
          }} />
        </label>
      </section>
      <section>
        {sims && sims.map((color) => {
          const [R, G, B] = color
          return (
            <div
              key={`color-${R}${G}${B}`}
              style={{
                minWidth: '3rem',
                minHeight: '3rem',
                width: 'auto',
                backgroundColor: `rgb(${R}, ${G}, ${B})`
              }}>{`#${toHex(R)}${toHex(G)}${toHex(B)}`}</div>
          )
        })}
      </section>
    </>
  )
}

export default App
