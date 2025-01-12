function format_team(res_team) {
  const teams = Array.isArray(res_team) ? res_team : [res_team];
  const team_table = teams.map(team => `
      <tr>
        <td>${team.id}</td>
        <td>${team.team_name}</td>
      </tr>
    `).join('');

    $('tbody').html(team_table);
}

async function get_team_list() {
  const request_url = 'http://localhost:3000/api/formula1_teams/';

  try {
    const team = await fetch(request_url);
    const res_team = await team.json();
  
    format_team(res_team);
  } catch (error) {
    $('#team_table').html(error);
  }
}

$('document').ready(get_team_list());
$('#re_get_teams').on('click', get_team_list);

$('#get_team button').on('click', async function(event) {
  event.preventDefault();

  const get_team = $('#get_team .value').val();
  const request_url = `http://localhost:3000/api/formula1_teams/${get_team}`;

  if(get_team === ''){
    alert(`内容を取得するには下記の要素を入力してください\n・ID`);
    return;
  }

  try {
    const team = await fetch(request_url);
    const res_team = await team.json();

    format_team(res_team);

    $('#get_team .value').val('');
  } catch (error) {
    $('#team_table').html(error);
  }
});

$('#add_team button').on('click', async function(event) {
  event.preventDefault();

  const add_team = $('#add_team .value').val();
  const request_url = 'http://localhost:3000/api/formula1_teams/';
  const post_team = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "team_name": add_team
    })
  };

  if(add_team === '') {
    alert(`内容を追加するには下記の要素を入力してください\n・チーム名`);
    return;
  }

  try{
    await fetch(request_url, post_team);

    get_team_list();

    $('#add_team .value').val('');
  } catch(error) {
    $('#team_table').html(error);
  }
});

$('#change_team button').on('click', async function(event) {
  event.preventDefault();

  const change_team_id = $('#change_team .value.id').val();
  const change_team_name = $('#change_team .value.name').val();
  const request_url = `http://localhost:3000/api/formula1_teams/${change_team_id}`;
  const put_team = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "team_name": change_team_name,
    })
  };
  const empties = [];

  if(change_team_id === ''){
    empties.push('ID');
  }

  if(change_team_name === ''){
    empties.push('チーム名');
  }

  if(empties.length > 0) {
    const empty_list = empties.map(empty => 
      `\n・${empty}`
    ).join('');
    const error_message = `内容を変更するには下記の要素を入力してください${empty_list}`;

    alert(error_message);

    return;
  }

  try{
    await fetch(request_url, put_team);

    get_team_list();

    $('#change_team .value.id, #change_team .value.name').val('');
  } catch(error) {
    $('#team_table').html(error);
  }
});

$('#withdraw_team button').on('click', async function(event) {
  event.preventDefault();

  const withdraw_team = $('#withdraw_team .value').val();
  const request_url = `http://localhost:3000/api/formula1_teams/${withdraw_team}`;
  const delete_team = {
    method: 'DELETE',
  };

  if(withdraw_team === '') {
    alert(`内容を追加するには下記の要素を入力してください\n・ID`);
    return;
  }

  try{
    await fetch(request_url, delete_team);
    
    get_team_list();

    $('#withdraw_team .value').val('');
  } catch(error) {
    $('#team_table').html(error);
  }
});