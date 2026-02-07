const sheetUrl = 'https://docs.google.com/spreadsheets/u/0/d/e/2PACX-1vQhrlZDrLt4pv4scqpmpenVh1SWtE2kHhkrWuW-K89pCeBmuUV1ImTooATtySwucBSsRkCIJT-NL6Tn/pubhtml/sheet?headers=false&gid=0';

const sheetUrl2 = 'https://docs.google.com/spreadsheets/u/0/d/e/2PACX-1vQhrlZDrLt4pv4scqpmpenVh1SWtE2kHhkrWuW-K89pCeBmuUV1ImTooATtySwucBSsRkCIJT-NL6Tn/pubhtml/sheet?headers=false&gid=1468137836';

const sheetUrl3 = 'https://docs.google.com/spreadsheets/u/0/d/e/2PACX-1vQhrlZDrLt4pv4scqpmpenVh1SWtE2kHhkrWuW-K89pCeBmuUV1ImTooATtySwucBSsRkCIJT-NL6Tn/pubhtml/sheet?headers=false&gid=570204050';

const sheetUrl4 = 'https://docs.google.com/spreadsheets/u/0/d/e/2PACX-1vQhrlZDrLt4pv4scqpmpenVh1SWtE2kHhkrWuW-K89pCeBmuUV1ImTooATtySwucBSsRkCIJT-NL6Tn/pubhtml/sheet?headers=false&gid=2023446293';

const countryFlags = {
  "Czad" :"https://flagcdn.com/td.svg",
  "Madagaskar":"https://flagcdn.com/mg.svg",
  "Niger":"https://flagcdn.com/ne.svg",
  "Nigeria":"https://flagcdn.com/ng.svg",
  "Albania":"https://flagcdn.com/al.svg",
  "Austria":"https://flagcdn.com/at.svg",
  "Belgia":"https://flagcdn.com/be.svg",
  "Czechy":"https://flagcdn.com/cz.svg",
  "Dania":"https://flagcdn.com/dk.svg",
  "Estonia":"https://flagcdn.com/ee.svg",
  "Finlandia":"https://flagcdn.com/fi.svg",
  "Francja":"https://flagcdn.com/fr.svg",
  "Grecja":"https://flagcdn.com/gr.svg",
  "Hiszpania":"https://flagcdn.com/es.svg",
  "Irlandia":"https://flagcdn.com/ie.svg",
  "Kosowo":"https://upload.wikimedia.org/wikipedia/commons/1/1f/Flag_of_Kosovo.svg",
  "Malta":"https://flagcdn.com/mt.svg",
  "Niemcy":"https://flagcdn.com/de.svg",
  "Niderlandy": "https://flagcdn.com/nl.svg",
  "Norwegia":"https://flagcdn.com/no.svg",
  "Polska": "https://flagcdn.com/pl.svg",
  "Portugalia":"https://flagcdn.com/pt.svg",
  "Serbia":"https://flagcdn.com/rs.svg",
  "Szwajcaria":"https://flagcdn.com/ch.svg",
  "Szwecja":"https://flagcdn.com/se.svg",
  "Turcja":"https://flagcdn.com/tr.svg",
  "Węgry":"https://flagcdn.com/hu.svg",
  "Wielka Brytania": "https://flagcdn.com/gb.svg",
  "Włochy": "https://flagcdn.com/it.svg",
  "Watykan": "https://flagcdn.com/va.svg",
  "Afganistan": "https://flagcdn.com/af.svg",
  "Japonia":"https://flagcdn.com/jp.svg",
  "Katar":"https://flagcdn.com/qa.svg",
  "Korea Południowa": "https://flagcdn.com/kr.svg",
  "Korea Północna": "https://flagcdn.com/kp.svg",
  "Nepal": "https://flagcdn.com/np.svg",
  "Tajlandia": "https://flagcdn.com/th.svg",
  "Brytyjskie Wyspy Dziewicze": "https://flagcdn.com/vg.svg",
  "Grenada":"https://flagcdn.com/gd.svg",
  "Kanada":"https://flagcdn.com/ca.svg",
  "Meksyk":"https://flagcdn.com/mx.svg",
  "Nikaragua":"https://flagcdn.com/ni.svg",
  "Stany Zjednoczone":"https://flagcdn.com/us.svg",
  "Wyspy Dziewicze Stanów Zjednoczonych":"https://flagcdn.com/vi.svg",
  "Nowa Zelandia": "https://flagcdn.com/nz.svg",
  "Argentyna":"https://flagcdn.com/ar.svg",
  "Brazylia":"https://flagcdn.com/br.svg",
  "Chile":"https://flagcdn.com/cl.svg",
  "Reprezentacja Uchodźców": "https://upload.wikimedia.org/wikipedia/commons/a/a7/Olympic_flag.svg"
};

const kalendarzDef = [
  { dyscyplina: "Biathlon", sub:[]},
  { dyscyplina: "Biegi narciarskie", sub:[]},
  { dyscyplina: "Bobsleje", sub:[]},
  { dyscyplina: "Curling", sub:[]},
  { dyscyplina: "Hokej na lodzie", sub:[]},
  { dyscyplina: "Kombinacja norweska", sub:[]},
  { dyscyplina: "Łyżwiarstwo figurowe", sub:[]},
  { dyscyplina: "Łyżwiarstwo szybkie", sub:[]},
  { dyscyplina: "Narciarstwo alpejskie", sub:[]},
  { dyscyplina: "Narciarstwo dowolne", sub:[]},
  { dyscyplina: "Saneczkarstwo", sub: [] },
  { dyscyplina: "Short track", sub: [] },
  { dyscyplina: "Skeleton", sub: [] },
  { dyscyplina: "Skoki narciarskie", sub: [] },
  { dyscyplina: "Snowboard", sub: [] }
];

async function preloadSheetData() {
  try {
    const res = await fetch(sheetUrl);
    const htmlText = await res.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlText, 'text/html');

    const rows = Array.from(doc.querySelectorAll('table tr'));
    const dataMap = new Map();

    rows.forEach(row => {
      const cells = row.querySelectorAll('td');
      if (cells.length >= 2) {
        let country = cells[0].textContent.trim();
        let note = cells[1].textContent.trim();
        let debiut = cells[2] ? cells[2].textContent.trim() : '';

        if (country && note) {
          let fullNote = note;
          if (debiut) {
            fullNote += ` (${debiut})`;
          }
          if (!dataMap.has(country)) {
            dataMap.set(country, []);
          }
          dataMap.get(country).push(fullNote);
        }
      }
    });

    // 🔥 uzupełnianie sekcji w cache
    for (let name of Object.keys(cache)) {
      let html = cache[name];
      // parsujemy stringa jako DOM
      const dom = new DOMParser().parseFromString(html, 'text/html');
      dom.querySelectorAll('span').forEach(span => {
        const country = span.textContent.trim();
        if (dataMap.has(country)) {
          const allNotes = dataMap.get(country).join(', ');
          span.innerHTML = `${country}<br>(${allNotes})`;
        }
      });
      // zapisujemy zmodyfikowany HTML z powrotem do cache
      cache[name] = dom.body.innerHTML;
    }

        window.playerCountryMap = {};
    for (let [country, players] of dataMap.entries()) {
      players.forEach(p => {
        // wyciągamy tylko nick (bo może być z debiutem w nawiasie)
        let nick = p.split(" (")[0];
        window.playerCountryMap[nick] = country;
      });
    }

  } catch (error) {
    console.error('Błąd podczas ładowania danych z arkusza:', error);
  }
}

async function loadMedals(sheetUrl2) {
  try{
    const res = await fetch(sheetUrl2);
    const htmlText = await res.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlText, 'text/html');

    const rows = Array.from(doc.querySelectorAll('table tr'));

    let medalTable = {};

    rows.forEach(row =>{
      const cells = row.querySelectorAll('td');
      let gold = cells[0]?.textContent.trim();
      let silver = cells[1]?.textContent.trim();
      let bronze = cells[2]?.textContent.trim();

      let dyscyplina = cells[4]?.textContent.trim();
      let konkurencja = cells[5]?.textContent.trim();
      
      let competition = dyscyplina;
      if (konkurencja) {
        competition += ` (${konkurencja})`;
      }

      if (gold) assignMedal(gold, "gold", medalTable, competition);
      if (silver) assignMedal(silver, "silver", medalTable, competition);
      if (bronze) assignMedal(bronze, "bronze", medalTable, competition);
    });

    let sorted = Object.values(medalTable).sort((a, b) => {
      if (b.gold !== a.gold) return b.gold - a.gold;
      if (b.silver !== a.silver) return b.silver - a.silver;
      if (b.bronze !== a.bronze) return b.bronze - a.bronze;
      return 0;
    });

    renderMedalTable(sorted, "medale");
  }catch(error){
    console.error("Błąd podczas ładowania klasyfikacji medalowej:", error);
  }
}

function assignMedal(player, type, medalTable, competition) {
  let country = window.playerCountryMap[player] || "Nieznany kraj";

  if (!medalTable[player]) {
    medalTable[player] = { 
      player, 
      gold: 0, silver: 0, bronze: 0,
      country,
      medals:[]
    };
  }

  medalTable[player][type]++;
  medalTable[player].medals.push({type, competition});
}

function renderMedalTable(data, sectionName) {
  const dom = new DOMParser().parseFromString(cache[sectionName], "text/html");
  const container = dom.getElementById("medal-table");
  container.innerHTML = "";

  let table = dom.createElement("table");
  table.className = "medal-table";

  table.innerHTML = `
    <thead>
      <tr>
        <th>Pozycja w Klasyfikacji</th>
        <th>Zawodnik</th>
        <th>Złote</th>
        <th>Srebrne</th>
        <th>Brązowe</th>
        <th>Razem</th>
      </tr>
    </thead>
    <tbody>
      ${data.map((row, i) => {
        const sortedMedals = row.medals.sort((a, b) => {
          const order = { gold: 1, silver: 2, bronze: 3 };
          return order[a.type] - order[b.type];
        });
        
        return `
        <tr class="player-row" data-player="${row.player}">
          <td>${i + 1}</td>
          <td>${countryFlags[row.country] ? `<img src="${countryFlags[row.country]}" width="30">`: ""} ${row.country} (${row.player})</td>
          <td>${row.gold}</td>
          <td>${row.silver}</td>
          <td>${row.bronze}</td>
          <td>${row.gold + row.silver + row.bronze}</td>
        </tr>
        <tr class="details-row" id="details-${row.player}">
          <td colspan="6">
            <div class="details-content">
              <ul>
                ${sortedMedals.map(m => `
                    <li class="${m.type.toUpperCase()}"><strong>${m.type.toUpperCase()}:</strong> ${m.competition}</li>
                  `).join("")}
              </ul>
            </div>
          </td>
        </tr>
      `}).join("")}
    </tbody>
  `;

  container.appendChild(table);
  cache[sectionName] = dom.body.innerHTML;
}

function activateMedalTableEvents() {
  // teraz bierzemy już "żywy" DOM
  const container = document.getElementById("medal-table");
  if (!container) return;

  container.querySelectorAll(".player-row").forEach(row => {
    row.addEventListener("click", () => {
      const details = container.querySelector("#details-" + row.dataset.player);
      if (details) details.classList.toggle("open");
    });
  });
}

let actualnapostrona = "";
const cache = {};
async function loadSection(name) {
  if (actualnapostrona !== name) {
    try {
      if (cache[name]) {
        document.getElementById("content").innerHTML = cache[name];
      } else {
        const res = await fetch(`${name}.html`);
        const html = await res.text();
        cache[name] = html; // zapis do cache
        document.getElementById("content").innerHTML = html;
      }
      actualnapostrona = name;

      if(name==="medale"){
        activateMedalTableEvents();
      }
    } catch (error) {
      console.error("Błąd ładowania sekcji:", error);
    }
  }
}

async function preloadSections(names) {
  for (const name of names) {
    if (!cache[name]) {
      const res = await fetch(`${name}.html`);
      cache[name] = await res.text();
    }
  }
}

async function loadRecords(sheetUrl3) {
  try{
    const res = await fetch(sheetUrl3);
    const htmlText = await res.text();
    
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlText, 'text/html');

    const rows = Array.from(doc.querySelectorAll('table tr'));

    let records = {}

    rows.forEach(row =>{
      const cells = row.querySelectorAll('td');
      if (cells.length >= 2) {
      let data = cells[0].textContent.trim();
      let Dyscyplina = cells[1].textContent.trim();
      let konkurencja = cells[2].textContent.trim();
      let faza = cells[3].textContent.trim();
      let zawodnik = cells[4]?.textContent.trim();
      let rekord = cells[5]?.textContent.trim();
      let jednostka = cells[6]?.textContent.trim();

      let country = window.playerCountryMap[zawodnik] || "Nieznany kraj";

      if(!records[`${Dyscyplina} ${konkurencja}`])
        records[`${Dyscyplina} ${konkurencja}`] = {
          data,
          Dyscyplina,
          konkurencja,
          faza,
          zawodnicy:[],
          rekord,
          jednostka
        }
      if(zawodnik)
        records[`${Dyscyplina} ${konkurencja}`].zawodnicy.push(`${countryFlags[country] ? `<img src="${countryFlags[country]}" width="30">`: ""}${country}(${zawodnik})`)

      }
    });

    renderRecordTable(Object.values(records), "rekordy")
  }catch(error){
    console.error("Błąd podczas ładowania rekordów:", error);
  }
}

function renderRecordTable(data, sectionName) {
  const dom = new DOMParser().parseFromString(cache[sectionName], "text/html");
  const container = dom.getElementById("record-table");
  container.innerHTML = "";
  let table = dom.createElement("table");
  table.className = "record-table";

  table.innerHTML = `
    <thead>
      <tr>
        <th>Data</th>
        <th>Zawody</th>
        <th>Zawodnicy</th>
        <th>Rekord</th>
      </tr>
    </thead>
    <tbody>
      ${data.map(row => `
        <tr>
          <td>${row.data}</td>
          <td><img src="${row.Dyscyplina}.png" width="50" style="vertical-align: middle;">${row.Dyscyplina} (${row.konkurencja} - ${row.faza})</td>
          <td>${row.zawodnicy.map(zawodnik => `${zawodnik}`).join("<br>")}</td>
          <td>${row.rekord} ${row.jednostka}</td>
        </tr>
      `).join("")}
    </tbody>
  `;

  container.appendChild(table);
  cache[sectionName] = dom.body.innerHTML;
}

async function loadHarmonogram(sheetUrl4){
  try{
    const res = await fetch(sheetUrl4);
    const htmlText = await res.text();
    
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlText, 'text/html');
    
    const rows = Array.from(doc.querySelectorAll('table tr'));
    
    let harmonogram = {}
    let kalendarz = {}

    rows.forEach(row => {
      const cells = row.querySelectorAll('td');
      if (cells.length >=2){
      let data = cells[0].textContent.trim();
      let godzina = cells[1].textContent.trim();
      let typ = cells[2].textContent.trim();
      let sport = cells[3].textContent.trim();
      let status = cells[4].textContent.trim();
      let komentarz = cells[5]?.textContent.trim();

      if(!harmonogram[data])
        harmonogram[data] = {
          data,
          godzina,
          sporty:[],
          statusy:[],
          komentarz
        }
      if(sport){
        harmonogram[data].sporty.push(`${sport}`);
        harmonogram[data].statusy.push(`${status}`);
      }
      if(typ==="ceremonia" || typ==="medal"){
        if (!kalendarz["Ceremonie"]) kalendarz["Ceremonie"] = {}
        kalendarz["Ceremonie"][data] = sport.includes("zamknięcia")?"Z" : sport.includes("otwarcia")? "O" : "M";
      }
      if(typ==="konkurencja"&&sport){
        const isFinal = /\[f\]/i.test(status);

        let main = sport;
        let sub = null;
        if(sport.startsWith("Kajakarstwo")) {
          main = "Kajakarstwo";
          sub = sport.split(' ')[1];
          sub = sub.charAt(0).toUpperCase() + sub.slice(1);
        }
        if (sport.startsWith("Kolarstwo")) {
          main = "Kolarstwo";
          sub = sport.split(' ')[1];
          sub = sub.charAt(0).toUpperCase() + sub.slice(1);
        }
        if (sport.startsWith("Gimnastyka")) {
          main = "Gimnastyka";
          sub = status.includes("skoki")? "Skoki" : "Sportowa";
        }

        if(!kalendarz[main]) kalendarz[main] = {};
        if(!kalendarz[main][sub]) kalendarz[main][sub] = {}
        if(!kalendarz[main][sub][data]) kalendarz[main][sub][data] = []

        kalendarz[main][sub][data].push(isFinal ? "F" : "E");
      }
      }
    });
    console.log("Kalendarz:")
    console.log(kalendarz);
    renderHarmonogramlist(Object.values(harmonogram),"harmonogram");
    renderCalender(kalendarz, "harmonogram");
  }catch(error){
    console.error("Błąd podczas wczytywania harmonogramu", error);
  }
}

function renderHarmonogramlist(data, sectionName){
  const dom = new DOMParser().parseFromString(cache[sectionName],"text/html");
  const container = dom.getElementById("harmonogram");
  container.innerHTML = "";

  let tabela = `
    ${data.map(row =>`
        <div class="date">${row.data}${row.komentarz ? " - " + row.komentarz : ""}</div>
        ${row.godzina ? `<p>${row.godzina}</p>` : ""}
        <ul class="list">
          ${row.sporty.map((sport, i) =>`
            <li class="item">
            <span class = "sport">${sport}</span>
            ${row.statusy[i] ? `<span class="status">${row.statusy[i]}</span>`:""}
            </li>
            `).join("")}
        </ul>
      `).join("")}
  `;
  container.innerHTML = tabela;
  cache[sectionName]=dom.body.innerHTML;
}

function renderCalender (data, sectionName){
  const dom = new DOMParser().parseFromString(cache[sectionName],"text/html");
  const container = dom.getElementById("kalendarz");
  container.innerHTML = "";
  let table = dom.createElement("table");
  table.className = "kalendarz";
  table.innerHTML += generowanie_Naglowka(data);
  container.appendChild(table);
  cache[sectionName] = dom.body.innerHTML;
}

function generowanie_Naglowka(data){

  const months = {
    "luty": 2,
    "marca": 3,
  };
  const monthNames = {
    2: "Luty",
    3: "Marzec",
  };
  const days = ["Nd.", "Pn.", "Wt.", "Śr.", "Cz.", "Pt.", "Sb."];

  // 1. zbieramy wszystkie daty
  const allDates = JSON.stringify(data).match(/\d{1,2} \p{L}+/gu) || [];
  // 2. unikalne i posortowane
  const sortedDates = [...new Set(allDates)].sort((a, b) => {
    const [dA, mA] = a.split(" ");
    const [dB, mB] = b.split(" ");
    return months[mA] - months[mB] || dA - dB;
  });

  // 3. grupowanie po miesiącach
  const grouped = {};
  sortedDates.forEach(date => {
    const [day, month] = date.split(" ");
    const monthNum = months[month];
    if (!grouped[monthNum]) grouped[monthNum] = [];
    grouped[monthNum].push(parseInt(day, 10));
  });

  // 4. pierwszy wiersz (nagłówek miesięcy)
  let header1 = `<tr>
    <th rowspan="2" colspan="2">`;
    const usedMonths = Object.keys(grouped).map(m => monthNames[m]);
    header1 += usedMonths.join("/ ") + " 2025</th>";
  for (const [monthNum, daysArr] of Object.entries(grouped)) {
    header1 += `<th colspan="${daysArr.length}">${monthNames[monthNum]}</th>`;
  }
  header1 += `<th rowspan="2">Konkurencje</th></tr>`;

  // 5. drugi wiersz (dni z nazwami)
  let header2 = "<tr>";
  sortedDates.forEach(date => {
    const [day, month] = date.split(" ");
    const dateObj = new Date(2026, months[month] - 1, parseInt(day, 10));
    const weekday = days[dateObj.getDay()];
    header2 += `<th>${day}<br>${weekday}</th>`;
  });
  header2 += "</tr>";

  const ceremonieClasses = {
    "O": "otwarcie",
    "M": "medale",
    "Z": "zakonczenie",
    "E": "zawody",
    "F": "finaly"
  };

  let rowCeremonie = "<tr><td colspan='2'>Ceremonie</td>";

  sortedDates.forEach(date => {
    const typ = data.Ceremonie?.[date]; // np. "O", "M", "Z"
    if (typ) {
      rowCeremonie += `<td class="${ceremonieClasses[typ]}">${typ}</td>`;
    } else {
      rowCeremonie += "<td></td>";
    }
  });

  rowCeremonie += "<td></td></tr>"; // ostatnia kolumna "Konkurencje"

  let zawody="";
  kalendarzDef.forEach(d => {
    const dyscyplina = d.dyscyplina;
    console.log(dyscyplina)
    const suby = d.sub;
    if (suby.length === 0) {
      let allF = 0;
      // zwykła dyscyplina - colspan 2
      zawody += `<tr><td colspan="2">${dyscyplina}</td>`;
        sortedDates.forEach(date =>{
        const typ = data[dyscyplina]?.null[date]; // np. "O", "M", "Z"
        console.log(typ);
          if (typ) {
            let fCount = 0;
            if (Array.isArray(typ)) {
              fCount = typ.filter(e => e === "F").length;
              allF +=fCount
            }
            zawody += `<td class="${ceremonieClasses[typ[typ.length - 1]]}">${fCount>0?fCount:""}</td>`;
          } else {
            zawody += "<td></td>";
          }}
        ); // miejsca na E/F lub ceremonie itd.
      zawody += `<td>${allF}</td></tr>`;
    } else {
      let totalF = 0;
      suby.forEach(sub => {
        sortedDates.forEach(date => {
          const typ = data[dyscyplina]?.[sub]?.[date];
          if (Array.isArray(typ)) totalF += typ.filter(e => e === "F").length;
        });
      });
      // dyscyplina z subami - rowspan = liczba subów
      suby.forEach((sub, i) => {
        zawody += "<tr>";
        if (i === 0) zawody += `<td rowspan="${suby.length}">${dyscyplina}</td>`;
        zawody += `<td>${sub}</td>`;
        sortedDates.forEach(date =>{
        const typ = data[dyscyplina]?.[sub][date]; // np. "O", "M", "Z"
          if (typ) {
            let fCount = 0;
            if (Array.isArray(typ)) {
              fCount = typ.filter(e => e === "F").length;
            }
            zawody += `<td class="${ceremonieClasses[typ[0]]}">${fCount>0?fCount:""}</td>`;
          } else {
            zawody += "<td></td>";
          }
        }); // miejsca na wyniki
        if (i === 0) zawody += `<td rowspan="${suby.length}">${totalF}</td>`;
        zawody += "</tr>";
      });
    }
  });

  const dailySums = Array(sortedDates.length).fill(0);
  let totalFAll = 0;

  kalendarzDef.forEach(d => {
    const dyscyplina = d.dyscyplina;
    const suby = d.sub;

    if (suby.length === 0) {
      sortedDates.forEach((date, i) => {
        const typ = data[dyscyplina]?.null[date];
        let fCount = 0;
        if (Array.isArray(typ)) fCount = typ.filter(e => e === "F").length;

        dailySums[i] += fCount; // dodajemy do sumy dnia
        totalFAll += fCount;    // dodajemy do sumy całkowitej
      });
    } else {
      suby.forEach(sub => {
        sortedDates.forEach((date, i) => {
          const typ = data[dyscyplina]?.[sub]?.[date];
          let fCount = 0;
          if (Array.isArray(typ)) fCount = typ.filter(e => e === "F").length;

          dailySums[i] += fCount;
          totalFAll += fCount;
        });
      });
    }
  });

  let rowSuma = '<tr><th colspan="2">Suma finałów</th>';
  dailySums.forEach(sum => rowSuma += `<th>${sum}</th>`);
  // ostatnia kolumna z sumą całkowitą
  rowSuma += `<th colspan="2">${totalFAll}</th></tr>`;

  return header1 + header2 + rowCeremonie + zawody + rowSuma;
}

async function init() {
  await preloadSections(["wstęp", "dyscypliny", "panstwa", "symbole", "medale", "rekordy", "obiekty", "harmonogram", "zaprzyjaźnieni"]);
  await preloadSheetData();
  await loadMedals(sheetUrl2);
  await loadRecords(sheetUrl3);
  await loadHarmonogram(sheetUrl4);
  await loadSection("wstęp")
}

init();