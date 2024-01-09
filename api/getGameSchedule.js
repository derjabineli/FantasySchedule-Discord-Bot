import axios from "axios";

let config = {
  method: "get",
  maxBodyLength: Infinity,
  url: "https://site.web.api.espn.com/apis/v2/scoreboard/header?sport=basketball&league=nba&region=us&lang=en&contentorigin=espn&buyWindow=1m&showAirings=buy%2Clive%2Creplay&showZipLookup=true&tz=America%2FNew_York",
  headers: {
    authority: "www.espn.com",
    accept: "application/json, text/plain, */*",
    "accept-language": "en-US,en;q=0.9,es-AR;q=0.8,es;q=0.7",
    referer: "https://www.espn.com/nba/schedule",
  },
};

export default async function getTodaysGames() {
  try {
    const response = await axios.request(config);
    const data = await response.data.sports[0].leagues[0].events;
    const games = JSON.parse(JSON.stringify(data));
    // console.log(JSON.parse(JSON.stringify(data)));

    // const games = data.map((game) => game.label);

    // console.log(games);
    return games;
  } catch (error) {
    console.error(error);
    return [];
  }
}
