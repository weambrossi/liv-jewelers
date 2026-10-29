// Usage: swift masks.swift <input.jpg> <outPrefix>
// Writes <outPrefix>-i<N>.png: one full-resolution grayscale mask per detected subject instance.
import Foundation
import Vision
import CoreImage
import CoreImage.CIFilterBuiltins
import ImageIO
import UniformTypeIdentifiers

let args = CommandLine.arguments
let input = URL(fileURLWithPath: args[1])
let prefix = args[2]

let handler = VNImageRequestHandler(url: input)
let request = VNGenerateForegroundInstanceMaskRequest()
try handler.perform([request])

guard let result = request.results?.first else {
  print("no subjects")
  exit(0)
}

let ctx = CIContext()
print("instances:", result.allInstances.map { $0 })
for idx in result.allInstances {
  let buffer = try result.generateScaledMaskForImage(forInstances: IndexSet(integer: idx), from: handler)
  let ci = CIImage(cvPixelBuffer: buffer)
  let url = URL(fileURLWithPath: "\(prefix)-i\(idx).png")
  try ctx.writePNGRepresentation(of: ci, to: url, format: .L8, colorSpace: CGColorSpaceCreateDeviceGray())
}
