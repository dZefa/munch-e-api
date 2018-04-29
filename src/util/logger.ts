const log = (...args: string[]) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(...args);
  }
};

export default log;
