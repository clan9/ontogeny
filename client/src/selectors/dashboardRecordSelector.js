import moment from "moment";

// Get visible records based on the selected filters on page
export default (records, { startDate, endDate }) => {
  return records
    .filter(record => {
      const dateMoment = moment(record.date);

      // if there is a startDate filter, is it <= date on record
      // if it is, return true, if not, return false
      // it there is no startDate filter, return true
      const startDateMatch = startDate
        ? startDate.isSameOrBefore(dateMoment, "day")
        : true;

      // if there is an endDate filter, is it >= date on record
      // if it is, return true.  If not, return false
      // if there is no endDate filter, return true
      const endDateMatch = endDate
        ? endDate.isSameOrAfter(dateMoment, "day")
        : true;

      // Only include records that match the following
      return startDateMatch && endDateMatch;
    })
    .sort((a, b) => (a.date < b.date ? -1 : 1)); // Oldest -> Newest
};
