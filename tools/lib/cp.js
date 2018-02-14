import cp from 'child_process';

export const spawn = (command, args, options) => new Promise((resolve, reject) => {
  cp.spawn(command, args, options).on('close', (code) => {
    if (code === 0) {
      resolve();
    } else {
      reject(new Error(`${command} ${args.join(' ')} => ${code} (error)`));
    }
  });
});

export default { spawn };
