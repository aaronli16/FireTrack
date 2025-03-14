import {ref, set as firebaseSet, push as firebasePush, get as fireBaseGet, remove as firebaseRemove} from 'firebase/database';
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


export function clearFireReport(reportId, userId, additionalData = {}) {
  if (!reportId) {
    throw new Error("Invalid report ID");
  }
  
  const fireReportRef = ref(db, `fireReports/${reportId}`);

  
  return fireBaseGet(fireReportRef)
    .then(function(snapshot) {
      if (!snapshot.exists()) {
        throw new Error("Fire report not found");
      }
      
      const existingReport = snapshot.val();
      
     
      const updatedReport = {
        ...existingReport,
        status: 'cleared',
        clearedById: userId,
        clearedAt: new Date().getTime(),
        ...additionalData
      };
      
      return firebaseSet(fireReportRef, updatedReport);
    })
    .then(function() {
    
      const activeFireReportsRef = ref(db, `activeFireReports/${reportId}`);
      return firebaseRemove(activeFireReportsRef);
    })
    .then(function() {
      return reportId;
    })
    .catch(function(error) {
      console.log("Error clearing fire report:", error);
      throw error;
    });
}



// Chatgpt helped with the two methods below, wanted to implement a function where when a fire gets cleared all fires a mile away or less is also cleared
export function clearNearbyFires(location, userId, radiusInMeters = 1609) { 
  if (!location || !location.lat || !location.lng) {
    throw new Error("Invalid location");
  }
  
  const fireReportsRef = ref(db, 'fireReports');
  
  
  return fireBaseGet(fireReportsRef)
    .then(function(snapshot) {
      if (!snapshot.exists()) {
        return [];
      }
      
      const allReports = snapshot.val();
      const reportsToUpdate = [];
      
      
      Object.keys(allReports).forEach(key => {
        const report = allReports[key];
        
        if (report.status !== 'cleared' && 
            report.location && 
            report.location.lat && 
            report.location.lng) {
          
          const distance = calculateDistance(
            location.lat, 
            location.lng, 
            report.location.lat, 
            report.location.lng
          );
          
          if (distance <= radiusInMeters) {
            reportsToUpdate.push({
              id: key,
              report: report,
              distance: distance
            });
          }
        }
      });
      
      
      if (reportsToUpdate.length === 0) {
        return {
          success: false,
          message: "No active fires found within the specified radius",
          updatedReports: []
        };
      }
      
      
      const updatePromises = reportsToUpdate.map(reportData => {
        return clearFireReport(reportData.id, userId, {
          clearedByProximity: true,
          originalClearedLocation: location
        });
      });
      
      return Promise.all(updatePromises)
        .then(() => {
          return {
            success: true,
            message: `${reportsToUpdate.length} fire reports cleared successfully`,
            updatedReports: reportsToUpdate
          };
        });
    })
    .catch(function(error) {
      console.log("Error clearing nearby fires:", error);
      throw error;
    });
}

// Chatgpt Helped me create this helper method to determine distance
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371e3; // Earth's radius in meters
  const φ1 = lat1 * Math.PI / 180;
  const φ2 = lat2 * Math.PI / 180;
  const Δφ = (lat2 - lat1) * Math.PI / 180;
  const Δλ = (lon2 - lon1) * Math.PI / 180;

  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  return R * c; 
}