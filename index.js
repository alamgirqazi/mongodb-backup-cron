const cron = require('node-cron'), spawn = require('child_process').spawn;
// once every day '0 0 0 * * *'

// below job will run every minute
let dbBackupTask = cron.schedule('* * * * *', () => {

    const date = new Date().toISOString().slice(0, 10) + '-'+ Date.now();
    archiveCommand = `--archive=./db/backup/${date}.gz`

    let backupProcess = spawn('mongodump', [
        '--db=my-db-name',
        archiveCommand,
        '--gzip'
      ]);

    backupProcess.on('exit', (code, signal) => {
        if(code) 
            console.log('Backup process exited with code ', code);
        else if (signal)
            console.error('Backup process was killed with signal ', signal);
        else 
            console.log('Successfully backedup the database')
    });
});
