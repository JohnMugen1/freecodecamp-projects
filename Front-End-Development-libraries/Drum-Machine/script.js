const bank = [
  {
    key: "Q",
    sound: "Heater 1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
  },
  {
    key: "W",
    sound: "Heater 2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
  },
  {
    key: "E",
    sound: "Heater 3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
  },
  {
    key: "A",
    sound: "Heater 4",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
  },
  {
    key: "S",
    sound: "Clap",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
  },
  {
    key: "D",
    sound: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
  },
  {
    key: "Z",
    sound: "Kick-n'-Hat",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
  },
  {
    key: "X",
    sound: "Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
  },
  {
    key: "C",
    sound: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
  }
];

const DrumPad = ({ keyTrigger, url, sound, updateDisplay }) => {
  const playSound = () => {
    const audio = document.getElementById(keyTrigger);
    audio.currentTime = 0;
    audio.play();
    updateDisplay(sound);
  };

  const handleKeyPress = (e) => {
    if (e.key.toUpperCase() === keyTrigger) {
      playSound();
    }
  };

  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, []);

  return (
    <div
      className="drum-pad"
      id={sound}
      onClick={playSound}
      style={{
        padding: "20px",
        margin: "10px",
        border: "2px solid #333",
        borderRadius: "8px",
        cursor: "pointer",
        backgroundColor: "#ccc",
        textAlign: "center",
        fontSize: "20px"
      }}
    >
      {keyTrigger}
      <audio className="clip" id={keyTrigger} src={url}></audio>
    </div>
  );
};

const DrumMachine = () => {
  const [display, setDisplay] = React.useState("Hit a Pad");

  const updateDisplay = (soundName) => {
    setDisplay(soundName);
  };

  return (
    <div
      id="drum-machine"
      style={{
        maxWidth: "400px",
        margin: "auto",
        textAlign: "center",
        backgroundColor: "#f5f5f5",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.3)"
      }}
    >
      <h2>Drum Machine</h2>
      <div id="display" style={{ marginBottom: "20px", fontSize: "18px" }}>
        {display}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "10px"
        }}
      >
        {bank.map((pad) => (
          <DrumPad
            key={pad.key}
            keyTrigger={pad.key}
            url={pad.url}
            sound={pad.sound}
            updateDisplay={updateDisplay}
          />
        ))}
      </div>
    </div>
  );
};

ReactDOM.render(<DrumMachine />, document.getElementById("root"));
