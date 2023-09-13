interface IProps {
  payload: string;
  xpos: number;
  ypos: number;
  show: boolean;
}

const Tooltip = ({ payload, xpos, ypos, show }: IProps) => {
  return (
    <div
      style={{
        display: show ? 'inline-block' : 'none',
        position: 'absolute',
        left: xpos + 'px',
        top: ypos + 'px',
        width: 'fit-content',
        height: 'fit-content',
        padding: '0.4rem',
        border: '1px solid black',
        backgroundColor: 'white',
      }}
    >
      {payload}
    </div>
  )
}

export default Tooltip;