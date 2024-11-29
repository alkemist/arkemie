require 'unidecode'

module Jekyll
  module SlugFilter
    def slug(input)
      input.to_s \
        .unicode_normalize(:nfc) \
        .downcase \
        .gsub(/[àáâãäå]/, 'a') \
        .gsub(/[èéêë]/, 'e') \
        .gsub(/[ìíîï]/, 'i') \
        .gsub(/[òóôõö]/, 'o') \
        .gsub(/[ùúûü]/, 'u') \
        .gsub(/[^a-z0-9\s-]/, '') \
        .strip \
        .gsub(/\s+/, '-')
    end
  end
end

Liquid::Template.register_filter(Jekyll::SlugFilter)