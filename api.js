let characters = ['Snylerdh', 'Sinjabusif', 'Jøyboy', 'Sizko', 'Qhrynne', 'Pititpeluche', 'Staxlock', 'Shikoroh', 
                    'Dustykai', 'Misakura', 'Nonolildrake', 'Bearjeww', 'Herarogue', 'Louisée', 'Daarkhër',
                     'Surlegrill', 'Cùrtis', 'Supxoxo']; 

let altCharacters = ['Qhryme', 'Misasuke', 'Staxette', 'Stâx', 'Dustiny', 'Dustylish', 'Gigapuddi', 'Siskoshamn',
                       'Curtís', 'Misalamèche', 'Sisköe', 'Peluchevoker', 'Sñyler', 'Misarrow', 'Dustea']

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
let altTable = document.getElementById('alt-results');

let characterRuns = [];
let altCharacterRuns = [];

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
      let numRuns = topRuns.length;

      // push an object representing the character's runs and total mythic level to the characterRuns array
      let charClass = data.class;
      characterRuns.push({ name: character, runs: topRuns, totalMythicLevel, numRuns, class: charClass });
    })
    .catch(error => {
      console.error(`Error getting data for ${character}: ${error}`);
    });
});

altCharacters.forEach(character => {
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
      let numRuns = topRuns.length;

      // push an object representing the character's runs and total mythic level to the characterRuns array
      let charClass = data.class;
      altCharacterRuns.push({ name: character, runs: topRuns, totalMythicLevel, numRuns, class: charClass });
    })
    .catch(error => {
      console.error(`Error getting data for ${character}: ${error}`);
    });
});

setTimeout(() => {
  altCharacterRuns.sort((a, b) => b.totalMythicLevel - a.totalMythicLevel);

  altCharacterRuns.forEach(character => {
    let name = character.name;
    let runs = character.runs;
    let numRuns = character.numRuns;
    let color = classColors[character.class] || 'white';

    // create a row for the alt character
    let row = altTable.insertRow();
    row.classList.add('table-row'); // add the class to the row
    let nameCell = row.insertCell();
    let dungeonCell = row.insertCell();
    let numRunsCell = row.insertCell();
if (numRuns > 0) {
  numRunsCell.innerHTML = numRuns;
} else {
  let img = document.createElement('img');
  img.src = 'starege.png';
  img.classList.add('numRunsImage');
  numRunsCell.appendChild(img);
}

    nameCell.innerHTML = name;
    dungeonCell.innerHTML = runs
    .map(run => ('' + run.mythic_level).slice(-2)) // pad the number with a leading 0 in case the key is lower than 10
      .reduce((acc, level, index) => {
        if (index === 1) {
          acc.push([level + ',']);
        } else if (index === 3) {
          acc[acc.length - 1].push(level + ',');
          acc.push([]);
        } else if (index === 7) {
          acc[acc.length - 1].push(level);
          acc.push([]);
        } else {
          acc[acc.length - 1].push(level + ',');
        }
        return acc;
      }, [[]])
      .map(group => group.join('').replace(/,$/, ' '))
    .join('|| ');
      row.style.backgroundColor = color;
    
  });
}, 3000);

// Once all the data has been retrieved, sort the characterRuns array by total mythic level
// and create rows in the table for each character's top runs
setTimeout(() => {
  characterRuns.sort((a, b) => b.totalMythicLevel - a.totalMythicLevel);

  characterRuns.forEach(character => {
    let name = character.name;
    let runs = character.runs;
    let numRuns = character.numRuns;
    let color = classColors[character.class] || 'white';

    // create a row for the character
    let row = table.insertRow();
    row.classList.add('table-row'); // add the class to the row
    let nameCell = row.insertCell();
    let dungeonCell = row.insertCell();
    let numRunsCell = row.insertCell();
    if (numRuns > 0) {
      numRunsCell.innerHTML = numRuns;
    } else {
      let img = document.createElement('img');
      img.src = 'starege.png';
      img.classList.add('numRunsImage');
      numRunsCell.appendChild(img);
    }

    nameCell.innerHTML = name;
    dungeonCell.innerHTML = runs
      .map(run => ('' + run.mythic_level).slice(-2)) // pad the number with a leading 0 in case the key is lower than 10
      .reduce((acc, level, index) => {
        if (index === 1) {
          acc.push([level + ',']);
        } else if (index === 3) {
          acc[acc.length - 1].push(level + ',');
          acc.push([]);
        } else if (index === 7) {
          acc[acc.length - 1].push(level);
          acc.push([]);
        } else {
          acc[acc.length - 1].push(level + ',');
        }
        return acc;
      }, [[]])
      .map(group => group.join('').replace(/,$/, ' '))
    .join('|| ');
      row.style.backgroundColor = color;
   
  });
}, 3000);
