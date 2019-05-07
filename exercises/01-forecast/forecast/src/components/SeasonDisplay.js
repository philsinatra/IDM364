import React from 'react';

const seasonConfig = {
  summer: {
    text: 'Lets hit the beach!',
    fileName: 'beach.jpg'
  },
  winter: {
    text: 'Burr, its cold!',
    fileName: 'snowflakes.jpg'
  }
};

const getSeason = (lat, month) => {
  if (month > 2 && month < 9) {
    return lat > 0 ? 'summer' : 'winter';
  } else {
    return lat > 0 ? 'winter' : 'summer';
  }
};

const SeasonDisplay = props => {
  const season = getSeason(props.lat, new Date().getMonth());
  const { text, fileName } = seasonConfig[season];

  return (
    <div className={`seasonDisplay ${season}`}>
      <p>{text}</p>
      <div className="seasonDisplay__image">
        <img src={`./${fileName}`} alt="" />
      </div>
    </div>
  );
};

export default SeasonDisplay;
