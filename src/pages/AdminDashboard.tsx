
import { useEffect, useState } from "react";
import AdminLogin from "./AdminLogin";
import ExpandableCard from "../components/ExpandableCard";
import heroImg from "../assets/dashboard.png";
import SongForm from "../components/SongForm";
import { getAdminSongs } from "../api.ts/SongService";
import type { Song } from "../models/Song";
import type { Enquiry } from "../models/Enquiry";
import { getAdminEnquiries } from "../api.ts/EnquiryService";
import EnquiriesList from "../components/EnquitySection";
import { auth } from "../firebase";
import { getIdTokenResult, onAuthStateChanged, signOut, } from "firebase/auth";


function AdminDashboard() {
    const [activeTab, setActiveTab] = useState<"songs" | "enquiries">("songs");

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [authLoading, setAuthLoading] = useState(true);

    const [songs, setSongs] = useState<Song[]>([]);
    const [songsLoading, setSongsLoading] = useState(true);
    const [songsError, setSongsError] = useState("");

    const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
    const [enquiriesLoading, setEnquiriesLoading] = useState(true);
    const [enquiriesError, setEnquiriesError] = useState("");

   // Load songs when the admin is authenticated
    useEffect(() => {
        if (authLoading) return;

        if (!isLoggedIn) {
            setSongs([]);
            setSongsLoading(false);
            return;
        }

        async function loadSongs() {
            try {
                setSongsLoading(true);
                setSongsError("");

                const data = await getAdminSongs();
                setSongs(data);
            } catch (error) {
                setSongsError(  error instanceof Error ? error.message : "Unable to load songs.");
            } finally {
                setSongsLoading(false);
            }
        }

        loadSongs();
    }, [isLoggedIn, authLoading]);

    // Load enquiries when the admin is authenticated
    useEffect(() => {
        if (authLoading) return;

        if (!isLoggedIn) {
            setEnquiries([]);
            setEnquiriesLoading(false);
            return;
        }

        async function loadEnquiries() {
            try {
                setEnquiriesLoading(true);
                setEnquiriesError("");

                const data = await getAdminEnquiries();
                setEnquiries(data);
            } catch (error) {
                setEnquiriesError(    error instanceof Error    ? error.message    : "Unable to load enquiries.");
            } finally {
                setEnquiriesLoading(false);
            }
        }

        loadEnquiries();
    }, [isLoggedIn, authLoading]);

    // Listen for Firebase authentication changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user) {
            setIsLoggedIn(false);
            setAuthLoading(false);
            return;
            }

            try {
            const tokenResult = await getIdTokenResult(user);

            setIsLoggedIn(tokenResult.claims.admin === true);
            } catch (error) {
            console.error("Unable to verify admin access:", error);
            setIsLoggedIn(false);
            } finally {
            setAuthLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);

    // Sign out the admin
    async function handleLogout() {
        try {
            await signOut(auth);
            setActiveTab("songs");
        } catch (error) {
            console.error("Unable to sign out:", error);
        }
    }

    const publishedSongs = songs.filter(  (song) => song.published).length;
    const newEnquiries = enquiries.filter(  (enquiry) => enquiry.status === "NEW").length;

    return (
        <main className="min-h-screen bg-cream px-6 py-10">
        <div className="mx-auto max-w-5xl space-y-8">

            <header className="text-center">
            <h1 className="font-display text-4xl text-espresso">
                Uchyy Admin
            </h1>
            <p className="mt-2 text-sm text-espresso-light">
                Manage your songwriting portfolio
            </p>
            </header>

            {/* Quick actions */}
            <section className="grid grid-cols-2 gap-6">

                <ExpandableCard
                    title={isLoggedIn ? "Sign out" : "Login"}
                    subtitle={ isLoggedIn   ? "Sign out of your admin account."   : "Sign in to manage your songwriting portfolio." }
                    image={heroImg}>
                    {authLoading ? (
                        <p>Checking authentication...</p>
                    ) : isLoggedIn ? (
                        <button
                        onClick={handleLogout}
                        className="rounded-lg bg-espresso px-5 py-3 text-ivory">
                        Sign out
                        </button>
                    ) : (
                        <AdminLogin />
                    )}
                </ExpandableCard>


                {isLoggedIn && (
                    <ExpandableCard
                        title="Add a new song"
                        subtitle="Add a new piece to your songwriting portfolio."
                        image={heroImg}>
                        <SongForm />
                    </ExpandableCard>
                )}

            </section>

            {/* Statistics */}
            <section className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-beige bg-ivory p-5">
                    <p className="font-label text-sm">Enquiries</p>
                    <p className="mt-2 font-display text-3xl font-bold">
                        {enquiriesLoading ? "..." : enquiries.length}
                    </p>
                    <p className="text-xs text-espresso-light font-bold">
                        {enquiriesLoading ? "Loading enquiries..." : `${newEnquiries} new`}
                    </p>
                </div>

                <div className="rounded-2xl border border-beige bg-ivory p-5">
                    <p className="font-label text-sm">Songs</p>
                    <p className="mt-2 font-display text-3xl">
                        {songsLoading ? "..." : songs.length}
                    </p>
                    <p className="text-xs text-espresso-light">
                        {songsLoading ? "Loading songs..." : `${publishedSongs} published`}
                    </p>
                </div>
            </section>

            {/* Management tabs */}
            <section className={!isLoggedIn ? "opacity-50" : ""}>
            <div className="flex gap-6 border-b border-beige">
                <button
                disabled={!isLoggedIn}
                onClick={() => setActiveTab("songs")}
                className={`border-b-2 px-2 pb-3 font-label text-sm ${
                    activeTab === "songs"
                    ? "border-gold text-espresso"
                    : "border-transparent text-espresso-light"
                }`}
                >
                Songs
                </button>

                <button
                disabled={!isLoggedIn}
                onClick={() => setActiveTab("enquiries")}
                className={`border-b-2 px-2 pb-3 font-label text-sm ${
                    activeTab === "enquiries"
                    ? "border-gold text-espresso"
                    : "border-transparent text-espresso-light"
                }`} >
                Enquiries
                </button>
            </div>

            <div className="mt-6">
                {activeTab === "songs" ? (
                <>
                    {songsLoading ? (
                    <p className="text-sm text-espresso-light">
                        Loading songs...
                    </p>
                    ) : songsError ? (
                    <p className="text-sm text-red-600">
                        {songsError}
                    </p>
                    ) : songs.length === 0 ? (
                    <p className="text-sm text-espresso-light">
                        No songs found.
                    </p>
                    ) : (
                    <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
                        {songs.map(song => (
                        <ExpandableCard
                            key={song.id}
                            title={song.title}
                            subtitle={song.description}
                            isSquare
                            image={song.artwork} >
                                <SongForm song={song} />
                        </ExpandableCard>
                        ))}
                    </div>
                    )}
                </>
                ) : (
                <section>
                    {enquiriesLoading ? (
                    <p>Loading enquiries...</p>
                    ) : enquiriesError ? (
                    <p className="text-red-600">{enquiriesError}</p>
                    ) : (
                    <EnquiriesList enquiries={enquiries} />
                    )}
                </section>
                )}
            </div>
            </section>

        </div>
       </main>
    );
}

export default AdminDashboard;
