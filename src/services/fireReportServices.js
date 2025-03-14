import {ref, set as firebaseSet, push as firebasePush, get as fireBaseGet} from 'firebase/database';
import {db} from '../firebase.js';



// This function saves a fire report to the Firebase Realtime Database.
export function saveFireReport(report, userId) {
    if (!report) {
      throw new Error("Invalid report object");
    }
    
    const fireReportRef = ref(db, 'fireReports');
    const newReportRef = firebasePush(fireReportRef);
    const reportId = newReportRef.key;
    

    const finalReport = {
      ...report,
      reportId: reportId,
      reporterId: userId,
      timestamp: new Date().getTime(),
      status: report.status || 'active'  
    };

    return firebaseSet(newReportRef, finalReport)
    .then(function(){
        if(finalReport.status === 'active') {
            const activeFireReportsRef = ref(db, `activeFireReports/${reportId}`);
            return firebaseSet(activeFireReportsRef, true);
        }
        return Promise.resolve();
    })
    .then(function(){
        return reportId;
    });
}


// This function fetches all fire reports from the Firebase Realtime Database.
export function fetchFireReports() {
    const fireReportsRef = ref(db, 'fireReports');
    
    return fireBaseGet(fireReportsRef)
      .then(function(snapshot) {
        if (snapshot.exists()) {
            const fireReports = snapshot.val();
            return Object.keys(fireReports).map(key => ({
                ...fireReports[key],
                id: key
            }));
        } else {
            return [];
        }
      })
      .catch(function(error) {
        console.log("Error fetching fire reports:", error);
        throw error; 
      });
}

