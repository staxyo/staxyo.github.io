let characters = ['Snylerdh', 'Sinjabusif', 'Jøyboy', 'Sizko', 'Qhrynne', 'Pititpeluche', 'Staxlock', 'Shikoroh', 
                    'Dustykai', 'Misakura', 'Nonolildrake', 'Bearjeww', 'Kujaalcoolic', 'Herarogue', 'Louisée', 'Daarkhër',
                     'Surlegrill', 'Cùrtis', 'Lahëe', 'Supxoxo']

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
//
let table = document.getElementById('results');

characters.forEach(character => {
  let url = `https://raider.io/api/v1/characters/profile?region=${region}&realm=${realm}&name=${character}&fields=${fields}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      let runs = data.mythic_plus_weekly_highest_level_runs;

      // extract the top 8 runs by mythic level
      let topRuns = runs
        .sort((a, b) => b.mythic_level - a.mythic_level)
        .slice(0, 8);

      // get the character class and color
      let charClass = data.class;
      let color = classColors[charClass] || 'white';

      // create a row for the character
      let row = table.insertRow();
      let nameCell = row.insertCell();
      let dungeonCell = row.insertCell();

      nameCell.innerHTML = character;
      dungeonCell.innerHTML = topRuns.map(run => run.mythic_level).join(', ');

      // set the row color based on the character class
      row.style.backgroundColor = color;
    })
    .catch(error => {
      console.error(`Error getting data for ${character}: ${error}`);
    });
});