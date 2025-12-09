import { createContext, useContext, useState, useEffect } from 'react';
import AxiosClient from '../config/axios';
import { useAuth } from './AuthContext';

const MembershipContext = createContext();

export function MembershipProvider({ children }) {
  const { user, isAuthenticated } = useAuth();
  const [memberships, setMemberships] = useState({});

  const fetchMembership = async (societyId) => {
    if (!isAuthenticated || !user) return;

    if (memberships[societyId]) return;

    try {
      const [memberRes, adminRes] = await Promise.all([
        AxiosClient.get('/societies/members/check', { params: { society_id: societyId } }),
        AxiosClient.get('/societies/admin/check', { params: { society_id: societyId } }),
      ]);

      setMemberships((prev) => ({
        ...prev,
        [societyId]: {
          isMember: memberRes.data.data ?? false,
          isAdmin: adminRes.data.data ?? false,
        },
      }));
    } catch (error) {
      console.error('Error fetching membership:', error);
      setMemberships((prev) => ({
        ...prev,
        [societyId]: { isMember: false, isAdmin: false },
      }));
    }
  };

  // un-used yet
  const clearMembership = async (societyId) => {
    try {
      await AxiosClient.post('/societies/leave', { society_id: societyId });
      setMemberships((prev) => ({
        ...prev,
        [societyId]: { isMember: false, isAdmin: false },
      }));
    } catch (error) {
      console.error('Error leaving society:', error);
    }
  };

  return (
    <MembershipContext.Provider value={{ memberships, fetchMembership, clearMembership }}>
      {children}
    </MembershipContext.Provider>
  );
}

export const useSocietyMembership = (societyId) => {
  const { memberships, fetchMembership, clearMembership } = useContext(MembershipContext);
  const membership = memberships[societyId] || { isMember: false, isAdmin: false };

  useEffect(() => {
    fetchMembership(societyId);
  }, [societyId]);

  return membership;
};
