
export const $getSchedules = `
  query getSchedules($type: String!, $status: String!, $page: Int!) {            
    schedule(type: $type, status: $status, page: $page) {
      seriesName,
      toss,
      venue,
      matchID,
      matchType,
      statusMessage,
      matchNumber,
      currentDay,
      matchScore {
        teamFullName,
        teamShortName,
        teamID
      }
    } 
  }`;
