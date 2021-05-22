function parseURI(uri) {
  // Quick sanity check
  if (typeof uri !== "string" || uri.length < 7) return null;

  // I would like to just use new URL(), but the behavior is different between node and browsers, so
  // we have to do some of the work manually with regex.
  const parts = /otpauth:\/\/([A-Za-z]+)\/([^?]+)\??(.*)?/i.exec(uri);

  if (!parts || parts.length < 3) {
    return null;
  }

  // eslint-disable-next-line no-unused-vars
  const [fullUri, type, fullLabel] = parts;

  // Sanity check type and label
  if (!type || !fullLabel) {
    return null;
  }

  // Parse the label
  const decodedLabel = decodeURIComponent(fullLabel);

  const labelParts = decodedLabel.split(/: ?/);

  const label =
    labelParts && labelParts.length === 2
      ? { issuer: labelParts[0], account: labelParts[1] }
      : { issuer: "", account: decodedLabel };

  // Parse query string
  const qs = parts[3] ? new URLSearchParams(parts[3]) : [];

  const query = [...qs].reduce((acc, [key, value]) => {
    acc[key] = value;

    return acc;
  }, {});

  // Returned the parsed parts of the URI
  return { type: type.toLowerCase(), label, query };
}

export default parseURI;
