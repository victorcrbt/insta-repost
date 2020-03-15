import axios from 'axios';

export default async postURL => {
  const response = await axios.get(postURL);

  const {
    id,
    display_url,
    video_url,
    video_duration,
    is_video,
    edge_media_to_caption,
    owner,
  } = response.data.graphql.shortcode_media;

  if (video_duration && video_duration > 60.0)
    return Alert.alert(
      'Falha na importação',
      'A duração máxima do vídeo é 1 minuto.'
    );

  const post = {
    id,
    display_url,
    video_url,
    is_video,
    caption: edge_media_to_caption.edges[0]?.node.text,
    author: owner,
    reposted: false,
  };

  return post;
};
