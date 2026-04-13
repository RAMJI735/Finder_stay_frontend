import React, { useState } from 'react'

type Capacity = {
  adults: number
  children: number
}

type Hotel = {
  _id: string
  name: string
  address: string
  city: string
}

type Owner = {
  _id: string
  email: string
  username: string
}

type RoomData = {
  _id: string
  number: string
  type: string
  price: number
  description: string
  amenities: string[]
  images: string[]
  isAvailable: boolean
  extraGuestAllowed: boolean
  capacity: Capacity
  hotel: Hotel
  owner: Owner
  createdAt: string
  updatedAt: string
}

type Props = {
  roomData: RoomData
  isLoading: boolean
  error: any
}

const amenityIcons: Record<string, string> = {
  WiFi: '◈',
  AC: '❄',
  TV: '▣',
  'Mini Bar': '◉',
  Pool: '〜',
  Gym: '◆',
  Spa: '✦',
  Parking: '◧',
}

function RoomDetails({ roomData, isLoading, error }: Props) {
  const [activeImage, setActiveImage] = useState(0)

  if (isLoading) {
    return (
      <div style={styles.stateContainer}>
        <div style={styles.shimmer}>
          <div style={{ ...styles.shimmerBlock, height: 340 }} />
          <div style={{ ...styles.shimmerBlock, height: 24, width: '60%', marginTop: 24 }} />
          <div style={{ ...styles.shimmerBlock, height: 16, width: '40%', marginTop: 12 }} />
          <div style={{ ...styles.shimmerBlock, height: 80, marginTop: 24 }} />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div style={styles.stateContainer}>
        <div style={styles.errorBox}>
          <span style={styles.errorIcon}>✕</span>
          <p style={styles.errorText}>
            {typeof error === 'string' ? error : 'Failed to load room details.'}
          </p>
        </div>
      </div>
    )
  }

  if (!roomData) return null

  const formattedDate = new Date(roomData.createdAt).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })

  return (
    <div style={styles.wrapper}>
      {/* Availability Badge */}
      <div style={styles.badgeRow}>
        <span style={roomData.isAvailable ? styles.badgeAvailable : styles.badgeUnavailable}>
          {roomData.isAvailable ? '● Available' : '● Unavailable'}
        </span>
        <span style={styles.listedDate}>Listed {formattedDate}</span>
      </div>

      {/* Image Gallery */}
      <div style={styles.galleryContainer}>
        <img
          src={roomData.images[activeImage]}
          alt={`Room ${roomData.number}`}
          style={styles.mainImage}
          onError={(e) => {
            ;(e.target as HTMLImageElement).src =
              'https://placehold.co/800x400/1a1a1a/555?text=No+Image'
          }}
        />
        {roomData.images.length > 1 && (
          <div style={styles.thumbnailRow}>
            {roomData.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Thumb ${i + 1}`}
                style={{
                  ...styles.thumbnail,
                  outline: i === activeImage ? '2px solid #c9a84c' : '2px solid transparent',
                  opacity: i === activeImage ? 1 : 0.55,
                }}
                onClick={() => setActiveImage(i)}
                onError={(e) => {
                  ;(e.target as HTMLImageElement).src =
                    'https://placehold.co/120x80/1a1a1a/555?text=No+Image'
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div style={styles.contentGrid}>
        {/* Left Column */}
        <div style={styles.leftCol}>
          <div style={styles.roomTypeTag}>{roomData.type} Room</div>
          <h1 style={styles.roomTitle}>Room {roomData.number}</h1>
          <p style={styles.hotelName}>{roomData.hotel.name}</p>
          <p style={styles.hotelAddress}>
            {roomData.hotel.address}, {roomData.hotel.city}
          </p>

          <p style={styles.description}>{roomData.description}</p>

          {/* Capacity */}
          <div style={styles.section}>
            <h3 style={styles.sectionLabel}>CAPACITY</h3>
            <div style={styles.capacityRow}>
              <div style={styles.capacityItem}>
                <span style={styles.capacityIcon}>♟</span>
                <span style={styles.capacityValue}>{roomData.capacity.adults}</span>
                <span style={styles.capacitySubLabel}>Adults</span>
              </div>
              <div style={styles.capacityDivider} />
              <div style={styles.capacityItem}>
                <span style={styles.capacityIcon}>♙</span>
                <span style={styles.capacityValue}>{roomData.capacity.children}</span>
                <span style={styles.capacitySubLabel}>Children</span>
              </div>
              {roomData.extraGuestAllowed && (
                <>
                  <div style={styles.capacityDivider} />
                  <div style={styles.extraGuest}>Extra Guest Allowed</div>
                </>
              )}
            </div>
          </div>

          {/* Amenities */}
          <div style={styles.section}>
            <h3 style={styles.sectionLabel}>AMENITIES</h3>
            <div style={styles.amenityGrid}>
              {roomData.amenities.map((a) => (
                <div key={a} style={styles.amenityPill}>
                  <span style={styles.amenityIcon}>{amenityIcons[a] ?? '·'}</span>
                  {a}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column — Price Card */}
        <div style={styles.rightCol}>
          <div style={styles.priceCard}>
            <p style={styles.priceLabel}>Per Night</p>
            <p style={styles.priceValue}>
              <span style={styles.priceCurrency}>₹</span>
              {roomData.price.toLocaleString('en-IN')}
            </p>

            <div style={styles.dividerLine} />

            <div style={styles.metaRow}>
              <span style={styles.metaKey}>Room ID</span>
              <span style={styles.metaVal}>#{roomData._id.slice(-6).toUpperCase()}</span>
            </div>
            <div style={styles.metaRow}>
              <span style={styles.metaKey}>Type</span>
              <span style={styles.metaVal}>{roomData.type}</span>
            </div>
            <div style={styles.metaRow}>
              <span style={styles.metaKey}>Extra Guest</span>
              <span style={styles.metaVal}>{roomData.extraGuestAllowed ? 'Yes' : 'No'}</span>
            </div>
            <div style={styles.metaRow}>
              <span style={styles.metaKey}>Listed by</span>
              <span style={styles.metaVal}>@{roomData.owner.username}</span>
            </div>

            <button style={styles.bookBtn}>Reserve Room</button>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Styles ─────────────────────────────────────────────── */
const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    fontFamily: "'Georgia', 'Times New Roman', serif",
    backgroundColor: '#0f0e0c',
    color: '#e8e0d0',
    minHeight: '100vh',
    padding: '32px 24px 64px',
    maxWidth: 960,
    margin: '0 auto',
  },

  /* States */
  stateContainer: {
    fontFamily: "'Georgia', serif",
    backgroundColor: '#0f0e0c',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  shimmer: { width: '100%', maxWidth: 640 },
  shimmerBlock: {
    backgroundColor: '#1e1c19',
    borderRadius: 4,
    width: '100%',
    animation: 'pulse 1.5s ease-in-out infinite',
  },
  errorBox: {
    border: '1px solid #5c1f1f',
    borderRadius: 6,
    padding: '32px 40px',
    textAlign: 'center',
    backgroundColor: '#1a1010',
  },
  errorIcon: { fontSize: 32, color: '#a33', display: 'block', marginBottom: 12 },
  errorText: { color: '#c88', margin: 0, fontFamily: 'Georgia, serif' },

  /* Badge row */
  badgeRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    marginBottom: 20,
  },
  badgeAvailable: {
    fontSize: 12,
    fontFamily: "'Courier New', monospace",
    letterSpacing: 1,
    color: '#7cc47c',
    border: '1px solid #2a4a2a',
    borderRadius: 20,
    padding: '4px 14px',
    backgroundColor: '#0d1f0d',
  },
  badgeUnavailable: {
    fontSize: 12,
    fontFamily: "'Courier New', monospace",
    letterSpacing: 1,
    color: '#c47c7c',
    border: '1px solid #4a2a2a',
    borderRadius: 20,
    padding: '4px 14px',
    backgroundColor: '#1f0d0d',
  },
  listedDate: {
    fontSize: 12,
    color: '#5a5347',
    fontFamily: "'Courier New', monospace",
    letterSpacing: 0.5,
  },

  /* Gallery */
  galleryContainer: { marginBottom: 32 },
  mainImage: {
    width: '100%',
    height: 360,
    objectFit: 'cover',
    borderRadius: 4,
    display: 'block',
    border: '1px solid #2a2820',
  },
  thumbnailRow: {
    display: 'flex',
    gap: 10,
    marginTop: 10,
  },
  thumbnail: {
    width: 100,
    height: 66,
    objectFit: 'cover',
    borderRadius: 3,
    cursor: 'pointer',
    transition: 'opacity 0.2s, outline 0.2s',
  },

  /* Grid */
  contentGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 300px',
    gap: 40,
    alignItems: 'start',
  },

  /* Left */
  leftCol: {},
  roomTypeTag: {
    display: 'inline-block',
    fontFamily: "'Courier New', monospace",
    fontSize: 11,
    letterSpacing: 3,
    color: '#c9a84c',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  roomTitle: {
    fontSize: 36,
    fontWeight: 400,
    margin: '0 0 4px',
    letterSpacing: -0.5,
    color: '#f0ead8',
  },
  hotelName: {
    fontSize: 18,
    margin: '0 0 2px',
    color: '#b8ad98',
    fontStyle: 'italic',
  },
  hotelAddress: {
    fontSize: 13,
    margin: '0 0 24px',
    color: '#5a5347',
    fontFamily: "'Courier New', monospace",
    letterSpacing: 0.3,
  },
  description: {
    fontSize: 15,
    lineHeight: 1.8,
    color: '#9e9485',
    margin: '0 0 32px',
    borderLeft: '2px solid #2a2820',
    paddingLeft: 16,
  },

  section: { marginBottom: 32 },
  sectionLabel: {
    fontSize: 10,
    letterSpacing: 3,
    color: '#5a5347',
    fontFamily: "'Courier New', monospace",
    fontWeight: 400,
    margin: '0 0 14px',
    textTransform: 'uppercase',
  },

  /* Capacity */
  capacityRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 20,
  },
  capacityItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 2,
  },
  capacityIcon: { fontSize: 20, color: '#c9a84c' },
  capacityValue: { fontSize: 24, fontWeight: 400, color: '#f0ead8' },
  capacitySubLabel: {
    fontSize: 11,
    color: '#5a5347',
    fontFamily: "'Courier New', monospace",
    letterSpacing: 1,
  },
  capacityDivider: { width: 1, height: 40, backgroundColor: '#2a2820' },
  extraGuest: {
    fontSize: 12,
    fontFamily: "'Courier New', monospace",
    color: '#7ca8c4',
    border: '1px solid #1a2a3a',
    borderRadius: 20,
    padding: '4px 12px',
    letterSpacing: 0.5,
  },

  /* Amenities */
  amenityGrid: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: 10,
  },
  amenityPill: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    fontSize: 13,
    color: '#b8ad98',
    border: '1px solid #2a2820',
    borderRadius: 4,
    padding: '8px 16px',
    backgroundColor: '#141210',
    letterSpacing: 0.3,
  },
  amenityIcon: { color: '#c9a84c', fontSize: 14 },

  /* Right — Price Card */
  rightCol: {},
  priceCard: {
    backgroundColor: '#141210',
    border: '1px solid #2a2820',
    borderRadius: 4,
    padding: '28px 24px',
    position: 'sticky',
    top: 24,
  },
  priceLabel: {
    fontSize: 11,
    fontFamily: "'Courier New', monospace",
    letterSpacing: 2,
    color: '#5a5347',
    margin: '0 0 6px',
    textTransform: 'uppercase',
  },
  priceValue: {
    fontSize: 44,
    fontWeight: 400,
    color: '#f0ead8',
    margin: '0 0 24px',
    letterSpacing: -1,
  },
  priceCurrency: { fontSize: 22, color: '#c9a84c', verticalAlign: 'super' },
  dividerLine: { borderTop: '1px solid #2a2820', margin: '0 0 20px' },
  metaRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  metaKey: {
    fontSize: 11,
    fontFamily: "'Courier New', monospace",
    letterSpacing: 1,
    color: '#5a5347',
    textTransform: 'uppercase',
  },
  metaVal: {
    fontSize: 13,
    color: '#b8ad98',
  },
  bookBtn: {
    width: '100%',
    marginTop: 24,
    padding: '14px 0',
    backgroundColor: '#c9a84c',
    color: '#0f0e0c',
    border: 'none',
    borderRadius: 3,
    fontSize: 13,
    fontFamily: "'Courier New', monospace",
    letterSpacing: 2,
    textTransform: 'uppercase',
    cursor: 'pointer',
    fontWeight: 700,
  },
}

export default RoomDetails