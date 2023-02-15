let characters = ['Snylerdh', 'Sinjabusif', 'Jøyboy', 'Sizko', 'Qhrynne', 'Pititpeluche', 'Staxlock', 'Shikoroh', 
                    'Dustykai', 'Misakura', 'Nonolildrake', 'Bearjeww', 'Kujaalcoolic', 'Herarogue', 'Louisée', 'Daarkhër',
                     'Surlegrill', 'Cùrtis', 'Lahëe', 'Supxoxo','Yukalock'];

let region = 'eu';
let realm = 'Ysondre';
let fields = 'mythic_plus_weekly_highest_level_runs';

// Define a mapping of classes to colors
let classColors = {
  'Warrior': '#C79C6E',
  'Paladin': '#F58CBA',
  'Hunter': '#ABD473',
  'Rogue': '#FFF569',
  'Priest': '#FFFFFF',
  'Death Knight': '#C41F3B',
  'Shaman': '#0070DE',
  'Mage': '#40C7EB',
  'Warlock': '#8787ED',
  'Monk': '#00FF96',
  'Druid': '#FF7D0A',
  'Demon Hunter': '#A330C9',
  'Evoker': '#5DB7A2'
};

let table = document.getElementById('results');

let characterRuns = [];

// Retrieve the data for each character and store their runs in the characterRuns array
characters.forEach(character => {
  let url = `https://raider.io/api/v1/characters/profile?region=${region}&realm=${realm}&name=${character}&fields=${fields},class`;


  fetch(url)
    .then(response => response.json())
    .then(data => {
      let runs = data.mythic_plus_weekly_highest_level_runs;

      // extract the top 8 runs by mythic level
      let topRuns = runs
        .sort((a, b) => b.mythic_level - a.mythic_level)
        .slice(0, 8);

      let totalMythicLevel = topRuns.reduce((acc, run) => acc + run.mythic_level, 0);

      // push an object representing the character's runs and total mythic level to the characterRuns array
      let charClass = data.class;
      characterRuns.push({ name: character, runs: topRuns, totalMythicLevel, class: charClass });

    })
    .catch(error => {
      console.error(`Error getting data for ${character}: ${error}`);
    });
});

// Once all the data has been retrieved, sort the characterRuns array by total mythic level
// and create rows in the table for each character's top runs
setTimeout(() => {
  characterRuns.sort((a, b) => b.totalMythicLevel - a.totalMythicLevel);

  characterRuns.forEach(character => {
    let name = character.name;
    let runs = character.runs;
    let color = classColors[character.class] || 'white';

    // create a row for the character
    let row = table.insertRow();
    let nameCell = row.insertCell();
    let dungeonCell = row.insertCell();

    nameCell.innerHTML = name;
    dungeonCell.innerHTML = runs
    .map(run => ('0' + run.mythic_level).slice(-2)) // pad the number with a leading 0 in case the key is lower than 10
    .reduce((acc, level, index) => {
      if (index % 2 === 0) {
        acc.push([level]);
      } else {
        acc[acc.length - 1].push(level);
      }
      return acc;
    },[])
    .map(group => group.join(',')) // joins the two runs in each group together
    .join(' || ') // join the three groups together with commas

    // set the row color based on the character class
    row.style.backgroundColor = color;
  });
}, 2000);