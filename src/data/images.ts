/**
 * Photography catalogue.
 *
 * Every photograph on the site is resolved through `img()` so that the whole
 * catalogue can be swapped for a client's own shoot by editing this one file.
 */

export type ImageSize =
  | "square_hd"
  | "square"
  | "portrait_4_3"
  | "portrait_16_9"
  | "landscape_4_3"
  | "landscape_16_9";

export function img(prompt: string, size: ImageSize = "landscape_4_3"): string {
  return `https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=${encodeURIComponent(
    prompt,
  )}&image_size=${size}`;
}

const P = {
  heroCourtyard:
    "editorial architectural photograph of a contemporary Goan luxury villa at dusk, private infinity pool reflecting warm lantern light, coconut palms, terracotta tiled roof, teak shutters, low stone wall, wide establishing shot on 24mm lens, warm natural light, photorealistic, no people, no text",
  poolDay:
    "sunlit private swimming pool of a tropical Indian villa, clear blue water, whitewashed walls, cane loungers with cream cushions, palm frond shadows on pale stone deck, midday, photorealistic architectural photography, no people, no text",
  poolEvening:
    "private villa swimming pool at blue hour, underwater lighting glowing turquoise, tall coconut palms silhouetted, teak deck, warm interior light spilling from open doors, photorealistic architectural photography, no people, no text",
  living:
    "airy living room of a luxury Goan villa, high pitched wooden ceiling, linen sofas in oatmeal, rattan armchairs, terrazzo floor, open doors framing tropical garden, soft natural daylight, interior editorial photography, no people, no text",
  bedroom:
    "serene villa bedroom, four poster teak bed with crisp white linen, jute rug, wooden louvered windows with filtered morning light, minimal tropical decor, ceiling fan, interior editorial photography, no people, no text",
  bedroomTwo:
    "bright guest bedroom in a tropical villa, twin beds with white cotton bedding, ochre lime plaster wall, framed botanical print, rattan bedside lamps, soft daylight from a balcony door, interior photography, no people, no text",
  bath:
    "open-air villa bathroom with a freestanding stone bathtub, tropical plants, brass fixtures, pebble floor, bamboo screen, spa-like calm, natural daylight, interior editorial photography, no people, no text",
  dining:
    "villa dining area with a long teak table, wicker pendant lights, terracotta floor tiles, open-plan kitchen, tropical greenery visible outside, warm afternoon daylight, interior editorial photography, no people, no text",
  kitchen:
    "modern open villa kitchen with pale stone counters, dark teak cabinetry, brass tapware, fresh fruit on the counter, bright natural light, interior editorial photography, no people, no text",
  garden:
    "manicured tropical garden of a private villa, frangipani and hibiscus, pale stone path, whitewashed boundary wall, soft early evening light, landscape photography, no people, no text",
  terrace:
    "rooftop terrace of a Goan villa overlooking paddy fields and coconut groves at sunset, two rattan chairs and a small brass table, ochre plaster parapet, wide landscape photography, no people, no text",
  balcony:
    "modern apartment balcony with a plunge pool overlooking palm trees in Candolim Goa, morning light, minimal lounge furniture, glass railing, photorealistic architectural photography, no people, no text",
  lane:
    "quiet Goan village lane with colourful Portuguese-era houses, bougainvillea spilling over a wall, coconut palms, dappled afternoon light, travel photography, no people, no text",
  portico:
    "villa entrance with an arched Portuguese portico, ochre lime plaster wall, potted palms, brass wall lantern, dark teak door, late afternoon light, architectural photography, no people, no text",
  beach: "quiet Goan beach at golden hour, wet sand mirroring the sky, palms leaning over the shoreline, gentle waves, no people, landscape photography, warm tones, no text",
  southBeach:
    "wide desolate South Goa beach at sunrise, long curve of pale sand, scattered fishing boats, casuarina trees, soft pastel sky, landscape photography, no people, no text",
  welcome:
    "close-up of a welcome tray on a teak table in a tropical villa, chilled coconut water, folded white towels, frangipani flowers, brass jug, soft window light, lifestyle photography, no people, no text",
  streetscooter:
    "pair of parked vintage scooters under a shade tree beside a Goan village wall, warm afternoon light, travel lifestyle photography, no people, no text",
  apartmentBlock:
    "boutique low-rise apartment building in Goa with balconies, white walls, dark wood railings, tropical planting, blue sky, architectural photography, no people, no text",
  poolNight:
    "private villa pool at night lit from within, warm garden uplighting on palms, teak sun loungers, deep blue sky with stars, photorealistic architectural photography, no people, no text",
} as const;

export type PhotoKey = keyof typeof P;

export const photo = (key: PhotoKey, size: ImageSize = "landscape_4_3") => img(P[key], size);
