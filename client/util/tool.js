const filter = {};
filter.DateFilter = (value, YDMFlag) => {
  if (value) {
    const d = new Date(parseInt(value));
    if (d) {
      const date = {
        Y: d.getFullYear(),
        M: d.getMonth() > 8 ? (d.getMonth() + 1) : '0' + (d.getMonth() + 1),
        D: d.getDate() > 9 ? d.getDate() : '0' + d.getDate(),
        h: d.getHours() > 9 ? d.getHours() : '0' + d.getHours(),
        m: d.getMinutes() > 9 ? d.getMinutes() : '0' + d.getMinutes(),
        s: d.getSeconds() > 9 ? d.getSeconds() : '0' + d.getSeconds(),
      };
      if (!YDMFlag) {
        return date.Y + '-' + date.M + '-' + date.D + ' ' + date.h + ':' + date.m + ':' + date.s;
      }
      return date.Y + '-' + date.M + '-' + date.D;
    }
    return '';
  }
  return '';
};

export default filter;
