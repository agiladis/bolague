//NOTES : Gagal dapet info team

const myFunction = () => {
  let x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

const spinner = document.querySelector('#preload')
const token = 'be0ef36a7e9f49f1bd8b6debe50a132b'


const getAPI = async(id_liga) => {
	spinner.innerHTML = `<div class="spinner-grow text-info" role="status"><span class="sr-only">Loading...</span></div>`
	const response = await fetch(`https://api.football-data.org/v2/competitions/${id_liga}/standings`, {headers:{'X-Auth-Token': token}})
	const data = await response.json()

	const fetchNMatch = await fetch(`https://api.football-data.org/v2/competitions/${id_liga}/matches?status=SCHEDULED`, {headers:{'X-Auth-Token': token}})
	const dataNMatch = await fetchNMatch.json()

	const fetchPMatch = await fetch(`https://api.football-data.org/v2/competitions/${id_liga}/matches?status=FINISHED`, {headers:{'X-Auth-Token': token}})
	const dataPMatch = await fetchPMatch.json()

	spinner.innerHTML = ''
	showStanding(data)
	showNMatch(dataNMatch)
	showPMatch(dataPMatch)
}

// const getAPITeam = async(id_team) => {
// 	const fetchTeam = await fetch(`https://api.football-data.org/v2/teams/${id_team}`, {headers:{'X-Auth-Token': token}})
// 	const dataTeam = await fetchTeam.json()

// 	showTeam(dataTeam)
// }

const showStanding = (klasemen) => {
	let peringkat = klasemen.standings[0].table
	const tableStand = document.querySelector('#tableStanding')

	let ligaName = klasemen.competition.name
	const tableNameLeague = document.querySelector('#tableName')
	//agar setiap search maka ter refresh/ tidak ada data lama
	tableStand.innerHTML = ''

	tableNameLeague.innerHTML = `<th colspan="8" class="text-uppercase">${ligaName}</th>`

	peringkat.forEach((s) => {
		tableStand.innerHTML +=
		` 	<tr>
				<th scope="row">${s.position}</th>
				<td>
					<a href="" class="black"><img src="${s.team.crestUrl}"> ${s.team.name}</a>
				</td>
			    <td>${s.playedGames}</td>
				<td>${s.won}</td>
				<td>${s.draw}</td>
			    <td>${s.lost}</td>
				<td>${s.points}</td>
		    </tr>`
	})
}

// const showTeam = (dataTeam) => {
// 	let team = dataTeam
// 	console.log(team)
// }

const showNMatch = (schedule) => {
	let nextM = schedule.matches
	const cardNextM = document.querySelector('#cardNM')
	//agar setiap search maka ter refresh/ tidak ada data lama
	cardNextM.innerHTML = ''
	if (nextM == 0) {
		cardNextM.innerHTML =	`<div class="end col-md-6 col-sm-3 col-6 float-left p-sm-1 p-1">
      									<div class="card nextMatch" >
											<img src="img/PL_logo.png" class="card-img-top" alt="">
											<div class="card-body">
												<span >
													<b>DATA NOT FOUND</b>
													<br>
													<i class="fa fa-clock-o"></i> DATA NOT FOUND (UTC)
												</span>
												<div class="row club mt-2 mb-2">
													<img src="img/PL_logo.png">
													<img src="img/PL_logo.png">
												</div>
												<h4><b>DATA NOT FOUND</b></h4>
												<h4><b>DATA NOT FOUND</b></h4>
												<a href="" class="btn btn-danger rounded-0 mb-3">DATA NOT FOUND  <i class="fa fa-angle-right"></i><i class="fa fa-angle-right"></i></a>
											</div>
										</div> <!-- end card -->
      								</div> <!-- end col-md-6 -->`
	} else {
		nextM.forEach((nm) => {
			// let idHome = nm.homeTeam.id
			// getAPITeam(idHome)
			cardNextM.innerHTML +=	`	<div class="end col-md-6 col-sm-3 col-6 float-left p-sm-1 p-1">
	      									<div class="card nextMatch" >
												<img src="img/PL_logo.png" class="card-img-top" alt="">
												<div class="card-body">
													<span >
														<b>${nm.stage}</b>
														<br>
														<i class="fa fa-clock-o"></i> ${nm.utcDate} (UTC)
													</span>
													<div class="row club mt-2 mb-2">
														<img src="img/PL_logo.png">
														<img src="img/PL_logo.png">
													</div>
													<h4><b>${nm.homeTeam.name}</b></h4>
													<h4><b>${nm.awayTeam.name}</b></h4>
													<a href="" class="btn btn-danger rounded-0 mb-3">CARI TIKET  <i class="fa fa-angle-right"></i><i class="fa fa-angle-right"></i></a>
												</div>
											</div> <!-- end card -->
	      								</div> <!-- end col-md-6 -->`
		})
	}
}

const showPMatch = (completed) => {
	let prevMatch = completed.matches
	const cardPrevMatch = document.querySelector('#cardPM')
	cardPrevMatch.innerHTML = ''
	if (prevMatch == 0) {
		cardPrevMatch.innerHTML += `<div class="historyMatch">
									<small><b>not found</b></small>
									<p class="teamGroup">
										<span class="teamSide">
											<img src="img/PL_logo.png">
											not found
										</span> <!-- end teamSide -->
										<span class="vsLogo">
											X
										</span>
										<span class="teamSide">
											<img src="img/PL_logo.png">
											not found
										</span>
									</p>
									<div class="container score">
										<b>not found</b>
									</div> <!-- end score -->
								</div> <!-- end historyMatch -->`
	} else {
		prevMatch.forEach((pm) => {
			cardPrevMatch.innerHTML += `<div class="historyMatch">
									<small><b>${pm.utcDate}</b></small>
									<p class="teamGroup">
										<span class="teamSide text-uppercase">
											<img src="img/PL_logo.png">
											${pm.homeTeam.name}
										</span> <!-- end teamSide -->
										<span class="vsLogo">
											X
										</span>
										<span class="teamSide text-uppercase">
											<img src="img/PL_logo.png">
											${pm.awayTeam.name}
										</span>
									</p>
									<div class="container score">
										<b>${pm.score.fullTime.homeTeam} - ${pm.score.fullTime.awayTeam}</b>
									</div> <!-- end score -->
								</div> <!-- end historyMatch -->`
		})
	}
}