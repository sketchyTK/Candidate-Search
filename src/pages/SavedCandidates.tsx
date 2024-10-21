import { useState, useEffect } from 'react';
import {Candidate} from '../interfaces/Candidate.interface';

const SavedCandidates: React.FC = () => {
  const[savedCandidates, setSavedCandidates]: any = useState<Candidate[]>([]);

  useEffect(() => {
    const save = localStorage.getItem('savedCandidates');
      if (save) {
        setSavedCandidates(JSON.parse(save));
      }
}, []);


const removeCandidateButton = (id:string) => {
  const updateCandidateList = savedCandidates.filter((candidate: Candidate) => candidate.id !== id);
  setSavedCandidates(updateCandidateList);
  localStorage.setItem('savedCandidates', JSON.stringify(updateCandidateList));
};
    return (
  <div>
    <h1>Potential Candidates</h1>
    {savedCandidates.length === 0 ? (
      <p>No Candidates have been selected</p>
    ) : (
    <table>
      <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Location</th>
          <th>Email</th>
          <th>GitHub URL</th>
          <th>Company</th>
          <th>Bio</th>
          <th>Reject</th>
        </tr>
      </thead>
      <tbody>
        {savedCandidates.map((candidate: Candidate) => (
          <tr key={candidate.id}>
           <td>
            {candidate ? (
                <img src={candidate.avatar_url} alt={candidate.name} width="100" height="100" />
              ) : (
                <img src="default-avatar-url.png" alt="Default Avatar" width="100" height="100" />
              )}
           </td>
           <td>
            {candidate ? (
              candidate.name || candidate.login
            ) : (
              'Not Available'
            )}
          </td>
                <td>
                  {candidate ? (
                    candidate.location || 'Not Available'
                  ) : ('Not Available')}
                </td>
                <td>
                  {candidate ? (
                  <a href={`mailto:${candidate.email || 'Not Available'}`}>{candidate.email || 'Not Available'}</a>
                  ) : ( 'Not Available' )
                }
                  </td>
                <td>
                  {candidate ? (
                  <a href={`${candidate.html_url || 'Not Available'}`} target="_blank">{candidate.html_url || 'Not Available'}</a>
                  ) : ( 'Not Available' )
                }
                </td>
                <td>
                  {candidate ? (
                     candidate.company || 'Not Available'
                  ) : ( 'Not Available' )
                }
                </td>
                <td>
                  {candidate ? (
                     candidate.bio || 'Not Available'
                    ) : ( 'Not Available' )
                  }
                </td>
                <td>
                  {candidate ? (
                    candidate.status === 'rejected' ? (
                      <span style={{ color: 'red' }}>X</span>
                    ) : (
                      <button onClick={() => candidate.id && removeCandidateButton(candidate.id)}>Reject</button>
                    )
                  ) : (
                    'No candidate available'
                  )}
                </td>
          </tr>
        ))}
      </tbody>
    </table>
          )} 
  </div>
  );
  
};


export default SavedCandidates;
