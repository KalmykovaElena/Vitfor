export const getAdvertSections = (data, sectionName, subSectionName) => {
  const advertCategory = data.find((item) => item.section === sectionName);
  const { search } = advertCategory.items.find((item) => item.subsection === subSectionName);
  const result = {
    section: advertCategory.link.slice(1),
    subsection: search,
  };
  return result;
};
