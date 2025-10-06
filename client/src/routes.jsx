import Home from './pages/Home.jsx'
import CleanImageMetadata from './pages/CleanImageMetadata.jsx'
import RemoveVideoMetadata from './pages/RemoveVideoMetadata.jsx'
import RemovePhotoMetadata from './pages/RemovePhotoMetadata.jsx'
import EditMetadata from './pages/EditMetadata.jsx'
import PdfMetadataRemover from './pages/PdfMetadataRemover.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import PrivacyPolicy from './pages/PrivacyPolicy.jsx'
import Disclaimer from './pages/Disclaimer.jsx'

export default [
  { path: '/', component: Home },
  { path: '/clean-image-metadata', component: CleanImageMetadata },
  { path: '/remove-video-metadata', component: RemoveVideoMetadata },
  { path: '/remove-photo-metadata', component: RemovePhotoMetadata },
  { path: '/edit-metadata', component: EditMetadata },
  { path: '/pdf-metadata-remover', component: PdfMetadataRemover },
  { path: '/about', component: About },
  { path: '/contact', component: Contact },
  { path: '/privacy-policy', component: PrivacyPolicy },
  { path: '/disclaimer', component: Disclaimer },
]
