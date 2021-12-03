export const createExperience = experience => (
  $.ajax({
    url: `/api/experiences`,
    method: "POST",
    data: { experience }
  })
);

export const fetchExperiences = userId => (
  $.ajax({
    url: `/api/users/${userId}/experiences`,
    method: "GET"
  })
);

export const updateExperience = experience => (
  $.ajax({
    url: `/api/experiences/${experience.id}`,
    method: "PATCH",
    data: { experience }
  })
);

export const deleteExperience = experienceId => (
  $.ajax({
    url: `/api/experiences/${experienceId}`,
    method: "DELETE"
  })
);