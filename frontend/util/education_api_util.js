export const createEducation = education => (
  $.ajax({
    url: `/api/educations`,
    method: "POST",
    data: { education }
  })
);

export const fetchEducations = userId => (
  $.ajax({
    url: `/api/users/${userId}/educations`,
    method: "GET"
  })
);

export const updateEducation = education => (
  $.ajax({
    url: `/api/educations/${education.id}`,
    method: "PATCH",
    data: { education }
  })
);

export const deleteEducation = educationId => (
  $.ajax({
    url: `/api/educations/${educationId}`,
    method: "DELETE"
  })
);