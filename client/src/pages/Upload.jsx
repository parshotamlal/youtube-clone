import { useEffect, useState } from 'react'
import api from '../api/axios'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

function Upload() {
  const [channels, setChannels] = useState([]);
  const [form, setForm] = useState({ title:'', description:'', thumbnailUrl:'', videoUrl:'', category:'Education', channelId:'' });
  const { user } = useAuth();
  const nav = useNavigate();

  useEffect(() => {
    if (!user) return;
    // simple: fetch all channels and let user pick their own (or you can add /my-channels)
    // For brevity we use /channels?owner=me in a real app; here just trust manual input or server can be extended.
  }, [user]);

  const submit = async (e) => {
    e.preventDefault();
    const { data } = await api.post('/videos', form);
    nav(`/video/${data._id}`);
  };

  if (!user) return <div>Please sign in to upload.</div>;

  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-semibold mb-4">Upload Video (URL-based)</h2>
      <form onSubmit={submit} className="space-y-3">
        <input className="w-full border rounded px-3 py-2" placeholder="Title" value={form.title} onChange={e=>setForm({...form, title:e.target.value})} required />
        <textarea className="w-full border rounded px-3 py-2" placeholder="Description" value={form.description} onChange={e=>setForm({...form, description:e.target.value})} />
        <input className="w-full border rounded px-3 py-2" placeholder="Thumbnail URL" value={form.thumbnailUrl} onChange={e=>setForm({...form, thumbnailUrl:e.target.value})} />
        <input className="w-full border rounded px-3 py-2" placeholder="Video URL" value={form.videoUrl} onChange={e=>setForm({...form, videoUrl:e.target.value})} />
        <input className="w-full border rounded px-3 py-2" placeholder="Channel ID (Mongo _id)" value={form.channelId} onChange={e=>setForm({...form, channelId:e.target.value})} required />
        <select className="w-full border rounded px-3 py-2" value={form.category} onChange={e=>setForm({...form, category:e.target.value})}>
          {['Education','Music','Gaming','Sports','News','Comedy','All'].map(c=><option key={c} value={c}>{c}</option>)}
        </select>
        <button className="px-3 py-2 rounded bg-gray-900 text-white">Save</button>
      </form>
    </div>
  )
}
export default Upload;